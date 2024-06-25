// Inscription (Sign-up)
1. Endpoint :
   - /auth/signup
2. Description :
   - Permet à un utilisateur de créer un nouveau compte en fournissant les informations nécessaires telles que le nom d'utilisateur, l'adresse e-mail et le mot de passe.
3. Méthode HTTP :
   - POST
4. Corps de la requête :
   - Informations nécessaires pour la création du compte (nom d'utilisateur, e-mail, mot de passe).

// Connexion (Login)
1. Endpoint :
   - /auth/login
2. Description :
   - Permet à un utilisateur de se connecter en fournissant ses informations d'identification (nom d'utilisateur ou e-mail et mot de passe).
3. Méthode HTTP :
   - POST
4. Corps de la requête :
   - Informations d'identification de l'utilisateur (nom d'utilisateur ou e-mail, mot de passe).

// Déconnexion (Logout) // peut etre pas ici mes sur krankend
1. Endpoint :
   - /auth/logout
2. Description :
   - Permet à un utilisateur connecté de se déconnecter.
3. Méthode HTTP :
   - POST

// Réinitialisation de mot de passe (Password Reset)     (a voir)
1. Endpoint :
   - /auth/reset
2. Description :
   - Permet à un utilisateur de réinitialiser son mot de passe après avoir suivi le lien de récupération envoyé par e-mail.
3. Méthode HTTP :
   - POST
4. Corps de la requête :
   - Nouveau mot de passe et token de récupération.

// Mise à jour du profil utilisateur (Update User Profile)
1. Endpoint :
   - /auth/profile
2. Description :
   - Permet à un utilisateur authentifié de mettre à jour son profil.
3. Méthode HTTP :
   - PUT
4. Corps de la requête :
   - Nouvelles informations de profil de l'utilisateur.

// Suppression du compte utilisateur (Delete User Account)
1. Endpoint :
   - /auth/account
2. Description :
   - Permet à un utilisateur authentifié de supprimer son compte de manière permanente.
3. Méthode HTTP :
   - DELETE

