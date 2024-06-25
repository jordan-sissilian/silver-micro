use actix_web::{get, HttpResponse, Responder};

// Define a struct to represent your JSON data
#[derive(Debug, serde::Serialize)]
struct ApiResponse {
    message: String,
}

// Handler function to return JSON response
#[get("/auth/logout")]
pub async fn logout() -> impl Responder {
    // Create an instance of the ApiResponse struct
    let response = ApiResponse {
        message: String::from("logout"),
    };

    //revoke token api jwt

    // Serialize the ApiResponse instance into a JSON response
    HttpResponse::Ok().json(response)
}
