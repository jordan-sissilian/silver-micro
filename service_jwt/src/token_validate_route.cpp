#include "token_route.hpp"

/**
 * \brief Ajoute une route pour valider les jetons JWT dans une application Crow.
 * 
 * Cette fonction crée une route pour valider les jetons JWT en utilisant l'objet app
 * passé en référence. La route est définie pour l'URL /tokens/validate et accepte uniquement
 * les requêtes HTTP de méthode POST.
 * 
 * La fonction de rappel associée à la route extrait le jeton JWT de l'en-tête Authorization
 * de la requête, s'il est présent, et vérifie sa validité en appelant la fonction valideTokenJWT().
 * Le résultat de la validation est utilisé pour déterminer le statut de la réponse JSON retournée.
 * 
 * \param app Une référence à l'objet crow::SimpleApp sur lequel ajouter la route.
 */
void addTokenValidateRoute(crow::SimpleApp& app) {
    // Définition de la route /tokens/validate pour la validation des jetons
    CROW_ROUTE(app, "/tokens/validate")
    .methods("POST"_method)
    ([](const crow::request& req) {
        auto authHeader = req.get_header_value("Authorization");

        // Extraction du jeton de l'en-tête Authorization s'il est présent
        std::string token;
        if (!authHeader.empty())
            if (authHeader.substr(0, 7) == "Bearer ")
                token = authHeader.substr(7);

        auto decode = JWTUtilities::decodeJWTToken(token);
        crow::json::wvalue response_json;
        // Vérification si le jeton JWT est valide et assignation du statut approprié dans la réponse
        response_json["status"] = JWTUtilities::verifyToken(token, decode.username, decode.role) ? "ok" : "error";
        return (crow::response(response_json));
    });
}
