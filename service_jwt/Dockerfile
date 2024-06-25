# Stage 1: Compilation du service JWT
FROM debian:buster AS build

# Mise à jour des paquets et installation de Curl
RUN apt-get update && apt-get install -y curl

# Installation des dépendances nécessaires au développement C++
RUN apt-get install -y g++ build-essential libssl-dev

# Copie de tout le contenu du répertoire local dans le conteneur sous /app
COPY . /app

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Compilation du service JWT
RUN g++ -o service_jwt \
        -I./lib/jwt-cpp-master/include \
        -I./lib/Crow-master/include \
        -I./lib/asio-1.30.2/include \
        -I./inc \
        main.cpp  ./src/*.cpp -pthread -lssl -lcrypto

# Stage 2: Création de l'image finale
FROM debian:buster

# Installation des bibliothèques manquantes
RUN apt-get update && apt-get install -y libssl1.1 curl

# Copie du binaire compilé à partir du premier stage
COPY --from=build /app/service_jwt /app/service_jwt

# Exposition du port 3030 utilisé par votre service
EXPOSE 3030

# Commande par défaut pour démarrer votre service JWT lorsque le conteneur démarre
CMD ["/app/service_jwt"]

