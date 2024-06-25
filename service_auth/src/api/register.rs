use actix_web::{Responder, HttpResponse};
use actix_web::web;
use serde::Deserialize;
use mongodb::{Client, Collection};
use mongodb::bson::{Document, doc};
use bcrypt::hash;

// Structure pour représenter les données du formulaire
#[derive(Deserialize)]
pub struct SignUpData {
    username: String,
    email: String,
    tel: String,
    password: String,
    confirmer_password: String,
}

// Structure pour représenter un utilisateur de la base de données
#[derive(Debug, Deserialize)]
struct User {
    username: String,
    password_hash: String,
    role: i32,
}

#[actix_web::post("/auth/register")]
pub async fn register(form_data: web::Form<SignUpData>, db: web::Data<Client>) -> impl Responder {
    // Accédez aux données du formulaire à partir de form_data
    let username = &form_data.username;
    let email = &form_data.email;
    let tel = &form_data.tel;
    let password = &form_data.password;
    let confirmer_password = &form_data.confirmer_password;

    // Validation des données du formulaire et gestion d'erreur
    if password != confirmer_password {
        // Les mots de passe ne correspondent pas
        return HttpResponse::BadRequest().body("Passwords do not match");
    }

    // Hasher le mot de passe
    let password_hash = match hash(password, bcrypt::DEFAULT_COST) {
        Ok(hash) => hash,
        Err(_) => return HttpResponse::InternalServerError().finish(), // Gestion de l'erreur de hachage
    };

    // Obtenez une référence de la base de données MongoDB
    let database = db.database("db_auth");

    // Obtenez une référence à la collection des utilisateurs
    let collection: Collection<Document> = database.collection("users");

    // Verifier l'User
    if let Some(existing_user) = collection.find_one(doc! {"$or": [{"username": username}, {"email": email}]}, None).await.unwrap() {
        // L'utilisateur existe déjà
        return HttpResponse::BadRequest().body("User already exists");
    }

    // Convertir les références en chaînes de caractères
    let username_str = username.to_string();
    let email_str = email.to_string();
    let tel_str = tel.to_string();

    // Créez un document BSON avec les données de l'utilisateur
    let user_doc = doc! {
        "username": username_str,
        "email": email_str,
        "tel": tel_str,
        "password_hash": password_hash,
        "role": 1
    };

    // Insérez le document dans la collection des utilisateurs
    if let Err(err) = collection.insert_one(user_doc, None).await {
        // Une erreur s'est produite lors de l'insertion dans la base de données
        eprintln!("Failed to insert document: {}", err);
        return HttpResponse::InternalServerError().finish();
    }

    // Renvoyer une réponse OK si l'insertion s'est déroulée avec succès
    HttpResponse::Ok().body("User registered successfully")
}
