#pragma once

#include <string>
#include <chrono>
#include <map>
#include "jwt-cpp/jwt.h"

namespace JWTUtilities
{
    const std::string SecretKey = "silverMicroJWTSecretKey"; // a faire

    struct jwt_elements {
    private:
        const std::string issuer_ = "service_jwt";
        const std::string tokenType_ = "JWT";

    public:
        std::string username;
        std::string role;
        std::string iss;
        std::string iat;
        std::string exp;

    public:
        jwt_elements(const std::map<std::string, std::string>& values) {
            auto it = values.find("username");
            if (it != values.end())
                username = it->second;

            it = values.find("role");
            if (it != values.end())
                role = it->second;

            it = values.find("iss");
            if (it != values.end())
                iss = it->second;

            it = values.find("iat");
            if (it != values.end())
                iat = it->second;

            it = values.find("exp");
            if (it != values.end())
                exp = it->second;
        }

        ~jwt_elements() {}
    };

    std::string createJWTToken(const std::string &username, const std::string &role);
    JWTUtilities::jwt_elements decodeJWTToken(const std::string &token);
    bool verifyToken(const std::string &token, const std::string &username, const std::string &role);
    std::string refreshTokenJWT(const std::string &token);
}
