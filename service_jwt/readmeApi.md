//a faire gestion d'erreur et exeption

1. Génération de Jeton JWT :
Endpoint : /tokens
Description : Permet de générer un nouveau jeton JWT en fonction des informations d'identification fournies par le service d'authentification.
Méthode HTTP : POST
Corps de la requête : Informations d'identification de l'utilisateur (username, role) envoyées au service d'authentification.

2. Validation de Jeton JWT :
Endpoint : /tokens/validate
Description : Permet de valider un jeton JWT pour déterminer s'il est authentique et s'il n'a pas été altéré.
Méthode HTTP : POST
Corps de la requête : Jeton JWT à valider.

3. Rafraîchissement de Jeton JWT :
Endpoint : /tokens/refresh
Description : Permet de rafraîchir un jeton JWT expiré en générant un nouveau jeton JWT avec une durée de validité prolongée.
Méthode HTTP : POST
Corps de la requête : Jeton JWT expiré.

4. Révocation de Jeton JWT : // a faire
Endpoint : /tokens/revoke
Description : Permet de révoquer un jeton JWT spécifique pour invalider son utilisation future.
Méthode HTTP : POST
Corps de la requête : Jeton JWT à révoquer.

5. Informations sur l'Utilisateur à partir du Jeton JWT :
Endpoint : /users/info
Description : Permet de récupérer les informations sur l'utilisateur à partir du jeton JWT, telles que l'username, le rôle, etc.
Méthode HTTP : GET
En-tête de la requête : Jeton JWT dans le header Authorization.

