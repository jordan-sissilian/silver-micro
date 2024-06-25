#include "jwt_elements.hpp"

namespace JWTUtilities
{
    /**
     * \brief Crée un jeton JWT contenant les informations d'utilisateur spécifiées.
     *
     * Cette fonction crée et signe un jeton JWT contenant les informations d'utilisateur spécifiées,
     * telles que le nom d'utilisateur et le rôle. Le jeton JWT est signé avec l'algorithme "none".
     *
     * \param username Le nom d'utilisateur à inclure dans le jeton JWT.
     * \param role Le rôle de l'utilisateur à inclure dans le jeton JWT.
     * \return Le jeton JWT créé.
     */
    std::string createJWTToken(const std::string &username, const std::string &role)
    {
        // Création du jeton JWT avec les informations fournies
        auto token = jwt::create()
                         .set_issuer("service_jwt")                             // Émetteur du jeton
                         .set_type("JWT")                                       // Type de jeton
                         .set_issued_now()                                      // Date et heure d'émission actuelle
                         .set_payload_claim("username", jwt::claim(username))   // Ajout du nom d'utilisateur comme revendication
                         .set_payload_claim("role", jwt::claim(role))           // Ajout du rôle comme revendication
                         .set_expires_in(std::chrono::seconds{86400})           // Durée de validité du jeton (1 jour)
                         .sign(jwt::algorithm::hs256{JWTUtilities::SecretKey}); // Signature du jeton avec l'algorithme hs256
        return (token);
    }

    /**
     * \brief Décodage d'un jeton JWT et extraction des revendications.
     *
     * Cette fonction décode un jeton JWT spécifié et extrait ses revendications, telles que le nom d'utilisateur
     * et le rôle. Les revendications sont retournées sous forme de std::map, où la clé est le nom de la revendication
     * et la valeur est sa valeur sous forme de chaîne de caractères.
     *
     * \param token Le jeton JWT à décoder.
     * \return Un std::map contenant les revendications du jeton JWT décodé.
     */
    JWTUtilities::jwt_elements decodeJWTToken(const std::string &token)
    {
        std::map<std::string, std::string> jwtDecodeMap;

        // Décodage du jeton JWT
        jwt::decoded_jwt<jwt::traits::kazuho_picojson> decoded = jwt::decode(token);

        // Boucle à travers les revendications du jeton décodé
        for (const auto &pair : decoded.get_payload_json())
            jwtDecodeMap[pair.first] = pair.second.serialize();

        JWTUtilities::jwt_elements jwtDecode(jwtDecodeMap);
        return (jwtDecode);
    }

    /**
     * \brief Valide un jeton JWT en vérifiant la signature et les informations du jeton.
     *
     * Cette fonction valide un jeton JWT spécifié en vérifiant à la fois la signature et les informations
     * contenues dans le jeton, telles que le nom d'utilisateur et le rôle. Elle utilise la clé secrète
     * pour vérifier la signature.
     *
     * \param token Le jeton JWT à valider.
     * \param username Le nom d'utilisateur attendu dans le jeton.
     * \param role Le rôle attendu dans le jeton.
     * \return true si le jeton est valide et contient les bonnes informations, sinon false.
     */
    bool verifyToken(const std::string &token, const std::string &username, const std::string &role) {
        try {
            // Décode le jeton
            auto decodedToken = jwt::decode(token);

            // Vérifie la signature
            jwt::verify()
                .allow_algorithm(jwt::algorithm::hs256{SecretKey})
                .verify(decodedToken);

            // Vérifie les revendications
            if (decodedToken.get_payload_claim("username").as_string() == username && decodedToken.get_payload_claim("role").as_string() == role)
                return (true);
        } catch (const std::exception &e) {
            // Gestion des erreurs
            std::cerr << "Erreur lors de la vérification du jeton : " << e.what() << std::endl;
            return (false);
        }
        return (false);
    }

    /**
     * \brief Rafraîchit un jeton JWT en créant un nouveau jeton basé sur les informations du jeton actuel.
     *
     * Cette fonction rafraîchit un jeton JWT spécifié en créant un nouveau jeton basé sur les informations du jeton
     * actuel, telles que le nom d'utilisateur et le rôle. Le nouveau jeton est créé avec une durée de validité
     * prédéfinie.
     *
     * \param token Le jeton JWT à rafraîchir.
     * \return Le nouveau jeton JWT créé.
     */
    std::string refreshTokenJWT(const std::string &token)
    {
        // Décodage du jeton JWT pour obtenir ses informations
        JWTUtilities::jwt_elements actualToken = decodeJWTToken(token);
        // Création d'un nouveau jeton JWT basé sur les informations du jeton actuel
        return (createJWTToken(actualToken.username, actualToken.role));
    }
};