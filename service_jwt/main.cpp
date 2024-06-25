#include "token_route.hpp"

int main(void) {
    crow::SimpleApp app;

    // Ajout des routes pour la gestion des jetons JWT
    addTokenRoute(app);
    addTokenValidateRoute(app);
    addTokenRefreshRoute(app);
    addTokenInfoRoute(app);
    addTokenRevokeRoute(app);

    // Configuration du port et exécution de l'application
    app.loglevel(crow::LogLevel::Warning);
    app.port(3030).multithreaded().run();
    return (0);
}

