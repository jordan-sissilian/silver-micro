#include "token_route.hpp"

/**
 * \brief Ajoute une route pour rafraîchir les jetons JWT dans une application Crow.
 * 
 * Cette fonction crée une route pour rafraîchir les jetons JWT en utilisant l'objet app
 * passé en référence. La route est définie pour l'URL /tokens/refresh et accepte uniquement
 * les requêtes HTTP de méthode POST.
 * 
 * La fonction de rappel associée à la route extrait le jeton JWT de l'en-tête Authorization
 * de la requête, s'il est présent. Si un jeton est extrait, la fonction refreshTokenJWT()
 * est appelée pour rafraîchir le jeton JWT et obtenir un nouveau jeton.
 * 
 * Le nouveau jeton JWT est ensuite inclus dans la réponse JSON avec la clé "Token".
 * 
 * \param app Une référence à l'objet crow::SimpleApp sur lequel ajouter la route.
 */
void addTokenRefreshRoute(crow::SimpleApp& app) {
    // Définition de la route /tokens/refresh pour le rafraîchissement des jetons JWT
    CROW_ROUTE(app, "/tokens/refresh")
    .methods("POST"_method)
    ([](const crow::request& req) {
        auto authHeader = req.get_header_value("Authorization");

        // Extraction du jeton de l'en-tête Authorization s'il est présent
        std::string token;
        if (!authHeader.empty())
            if (authHeader.substr(0, 7) == "Bearer ")
                token = authHeader.substr(7);

        crow::json::wvalue response_json;
        // Création de la réponse JSON avec le nouveau jeton JWT rafraîchi
        response_json["Token"] = JWTUtilities::refreshTokenJWT(token);
        return (crow::response(response_json));
    });
}

