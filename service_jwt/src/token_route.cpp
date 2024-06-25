#include "token_route.hpp"

void parseFormDataString(const std::string &data, std::string &username, std::string &role) {
    size_t usernamePos = data.find("username=");
    size_t rolePos = data.find("&role=");

    if (usernamePos != std::string::npos && rolePos != std::string::npos) {
        username = data.substr(usernamePos + strlen("username="), rolePos - (usernamePos + strlen("username=")));
        role = data.substr(rolePos + strlen("&role="));
    }
}

/**
 * \brief Ajoute une route pour créer des jetons JWT dans une application Crow.
 * 
 * Cette fonction crée une route pour créer des jetons JWT en utilisant l'objet app
 * passé en référence. La route est définie pour l'URL /tokens et accepte uniquement
 * les requêtes HTTP de méthode POST.
 * 
 * La fonction de rappel associée à la route extrait les paramètres d'URL "username" et "role"
 * de la requête. Si l'un ou les deux paramètres sont manquants, une réponse HTTP 400 (Bad Request)
 * est renvoyée avec un message indiquant la valeur manquante.
 * 
 * Si les deux paramètres sont présents, un jeton JWT est créé en utilisant les valeurs de "username"
 * et "role", en appelant la fonction createJWTToken().
 * 
 * Le jeton JWT créé est ensuite inclus dans une réponse JSON avec la clé "tokenJWT", qui est retournée
 * dans le corps de la réponse.
 * 
 * \param app Une référence à l'objet crow::SimpleApp sur lequel ajouter la route.
 */
void addTokenRoute(crow::SimpleApp& app) {
    // Définition de la route /tokens pour la création de jetons JWT
    CROW_ROUTE(app, "/tokens")
    .methods("POST"_method)
    ([](const crow::request& req) {

        std::string usernameStr;
        std::string roleStr;
        parseFormDataString(std::string(req.body), usernameStr, roleStr);

        // Vérification si les deux paramètres sont présents
        if (usernameStr.empty() || roleStr.empty())
            return crow::response(crow::json::wvalue{{"Error", "Error400"}});

        // Création d'un jeton JWT avec les informations fournies
        std::string token = JWTUtilities::createJWTToken(usernameStr, roleStr);

        crow::json::wvalue response_json;
        response_json["tokenJWT"] = token;
        return crow::response(response_json);
    });
}

