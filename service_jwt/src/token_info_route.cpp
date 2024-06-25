#include "token_route.hpp"

/**
 * \brief Ajoute une route pour obtenir des informations sur les utilisateurs à partir des jetons JWT dans une application Crow.
 * 
 * Cette fonction crée une route pour obtenir des informations sur les utilisateurs à partir des jetons JWT en utilisant l'objet app
 * passé en référence. La route est définie pour l'URL /users/info et accepte uniquement
 * les requêtes HTTP de méthode POST.
 * 
 * La fonction de rappel associée à la route extrait le jeton JWT de l'en-tête Authorization
 * de la requête, s'il est présent. Si un jeton est extrait, la fonction decodeJWTToken()
 * est appelée pour décoder le jeton JWT et obtenir ses informations.
 * 
 * Les informations extraites du jeton JWT sont ensuite incluses dans la réponse JSON avec les clés suivantes :
 * - "Username" : Nom d'utilisateur extrait du jeton
 * - "Role" : Rôle de l'utilisateur extrait du jeton
 * - "Iss" : Émetteur du jeton (iss)
 * - "Iat" : Date et heure de création du jeton (iat)
 * - "Exp" : Date et heure d'expiration du jeton (exp)
 * 
 * \param app Une référence à l'objet crow::SimpleApp sur lequel ajouter la route.
 */
void addTokenInfoRoute(crow::SimpleApp& app) {
    // Définition de la route /users/info pour obtenir des informations sur les utilisateurs à partir des jetons JWT
    CROW_ROUTE(app, "/users/info")
    .methods("GET"_method)
    ([](const crow::request& req) {
        auto authHeader = req.get_header_value("Authorization");

        // Extraction du jeton de l'en-tête Authorization s'il est présent
        std::string token;
        if (!authHeader.empty())
            if (authHeader.substr(0, 7) == "Bearer ")
                token = authHeader.substr(7);

        // Décodage du jeton JWT et obtention de ses informations
        JWTUtilities::jwt_elements tokenDecode = JWTUtilities::decodeJWTToken(token);
        crow::json::wvalue response_json;
        // Création de la réponse JSON avec les informations extraites du jeton JWT
        response_json["Username"] = tokenDecode.username;
        response_json["Role"] = tokenDecode.role;
        response_json["Iss"] = tokenDecode.iss;
        response_json["Iat"] = tokenDecode.iat;
        response_json["Exp"] = tokenDecode.exp;
        return (crow::response(response_json));
    });
}

