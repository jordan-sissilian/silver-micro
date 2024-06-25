#include "token_route.hpp"

/**
 * \brief Ajoute une route pour révoquer des jetons JWT dans une application Crow.
 * 
 * Cette fonction crée une route pour révoquer des jetons JWT en utilisant l'objet app
 * passé en référence. La route est définie pour l'URL /tokens/revoke et accepte uniquement
 * les requêtes HTTP de méthode POST.
 * 
 * La fonction de rappel associée à la route extrait le jeton JWT de l'en-tête Authorization
 * de la requête, s'il est présent. Si un jeton est extrait, il est inclus dans la réponse JSON
 * avec la clé "TokenRevoke", mais aucune vérification ou action réelle de révocation n'est effectuée
 * dans cette implémentation.
 * 
 * Cette fonctionnalité doit être étendue pour inclure la logique de révocation réelle, comme la suppression
 * du jeton de la liste des jetons valides ou le marquage du jeton comme révoqué dans un système de stockage.
 * 
 * \param app Une référence à l'objet crow::SimpleApp sur lequel ajouter la route.
 */
void addTokenRevokeRoute(crow::SimpleApp& app) {
    // Définition de la route /tokens/revoke pour la révocation des jetons JWT
    CROW_ROUTE(app, "/tokens/revoke")
    .methods("POST"_method)
    ([](const crow::request& req) {
        auto authHeader = req.get_header_value("Authorization");

        // Extraction du jeton de l'en-tête Authorization s'il est présent
        std::string token;
        if (!authHeader.empty())
            if (authHeader.substr(0, 7) == "Bearer ")
                token = authHeader.substr(7);

        // Création de la réponse JSON avec la clé "TokenRevoke"
        crow::json::wvalue response_json;
        response_json["TokenRevoke"] = "tokenRevoke"; // a faire
        return (crow::response(response_json));
    });
}
