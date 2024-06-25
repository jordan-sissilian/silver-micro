use actix_web::{App, HttpServer};
use actix_web::web::Data;
use mongodb::{Client, options::ClientOptions};

mod api;
use api::login;
use api::register;
use api::logout;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Set up MongoDB client
    let client_options = ClientOptions::parse("mongodb://172.18.0.5:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6").await.unwrap();
    let client = Client::with_options(client_options).unwrap();

    // Vérifier la connexion en listant les noms des bases de données
    match client.list_database_names(None, None).await {
        Ok(database_names) => {
            println!("Connecté avec succès !");
            for db_name in database_names {
                println!("{}", db_name);
            }
        },
        Err(e) => {
            eprintln!("Erreur de connexion : {}", e);
        }
    }

    // Start the Actix Web server
    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(client.clone())) // Share database connection
            .service(login::login)
            .service(logout::logout)
            .service(register::register)
    })
    .bind("0.0.0.0:7070")?
    .run()
    .await
}

