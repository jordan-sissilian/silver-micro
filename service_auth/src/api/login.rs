use actix_web::{Responder, HttpResponse};
use actix_web::web;
use serde::Deserialize;
use mongodb::{Client, Collection};
use mongodb::bson;
use mongodb::bson::{Document, doc};
use bcrypt::verify;

pub const JWT_API: &str = "172.18.0.3:3030";
pub const JWT_API_LOCAL: &str = "localhost:3030";

// Structure pour représenter les données du formulaire
#[derive(Deserialize)]
pub struct SignInData {
    username: String,
    password: String,
}

// Structure pour représenter un utilisateur de la base de données
#[derive(Deserialize)]
struct User {
    username: String,
    password_hash: String,
    role: i32
}

#[actix_web::post("/auth/login")]
pub async fn login(form_data: web::Form<SignInData>, db: web::Data<Client>) -> impl Responder {
    let username = &form_data.username;
    let password = &form_data.password;

    let database = db.database("db_auth");
    // Récupérer la collection "users"
    let collection: Collection<Document> = database.collection("users");

    // Recherche l'utilisateur dans la base de données
    let filter = doc! { "username": username };
    if let Ok(Some(user_doc)) = collection.find_one(filter, None).await {
        let user: User = bson::from_document(user_doc).unwrap();
        // Vérifie le mot de passe
        match verify(password, &user.password_hash) {
            Ok(true) => {
                let url = format!("http://{}/tokens", JWT_API);
                let response = ureq::post(&url)
                    .send_form(&[
                        ("username", &username),
                        ("role", &user.role.to_string()),
                    ]);
                match response {
                    Ok(resp) => {
                        let status = resp.status();
                        let body = resp.into_string().unwrap_or_else(|_| String::from("Error reading response body"));
                        if status >= 200 && status < 300 {
                            return HttpResponse::build(actix_web::http::StatusCode::from_u16(status).unwrap()).body(body);
                        } else {
                            return HttpResponse::InternalServerError().finish();
                        }
                    }
                    Err(_) => return HttpResponse::InternalServerError().finish(),
                }
            }
            Ok(false) => return HttpResponse::Unauthorized().body("Invalid credentials"),
            Err(_) => return HttpResponse::InternalServerError().finish(), // Gérer l'erreur de bcrypt
        }
    } else {
        println!("Erreur Mongo");
    }

    // Si aucun utilisateur correspondant n'est trouvé
    HttpResponse::Unauthorized().body("Invalid credentials")
}
