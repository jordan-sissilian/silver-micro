# Première étape de construction
FROM node:16-alpine as builder

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json (ou package*.json)
COPY package*.json ./

# Installation des dépendances de l'application
RUN npm install

# Copie des fichiers source de l'application
COPY . .

# Construction de l'application React
RUN npm run build

# Deuxième étape de construction
FROM nginx:alpine

# Copie du build de l'application depuis l'étape précédente
COPY --from=builder /app/build /usr/share/nginx/html

# Copie du fichier de configuration personnalisé
COPY nginx.conf /etc/nginx/nginx.conf

# Exposition du port 80 (par défaut pour Nginx)
EXPOSE 80

# Commande à exécuter lorsque le conteneur démarre
CMD ["nginx", "-g", "daemon off;"]
