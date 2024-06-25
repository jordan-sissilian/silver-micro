#pragma once

#include "crow.h"
#include "jwt_elements.hpp"

void addTokenRoute(crow::SimpleApp& app);
void addTokenValidateRoute(crow::SimpleApp& app);
void addTokenRefreshRoute(crow::SimpleApp& app);
void addTokenInfoRoute(crow::SimpleApp& app);
void addTokenRevokeRoute(crow::SimpleApp& app);