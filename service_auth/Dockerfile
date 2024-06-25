# Utilisez une image de base Ubuntu 20.04
FROM ubuntu:20.04 as builder

# Mettre à jour les paquets et installer les outils de développement
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libpq-dev

# Installation de Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN rustup update
# Création d'un nouveau répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de configuration et le code source
COPY Cargo.toml Cargo.lock ./
COPY src ./src

# Compilation de l'application
RUN cargo build --release

# Crée une nouvelle image légère pour l'exécution
FROM ubuntu:20.04

# Mettre à jour les paquets et installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    libpq-dev curl

# Copie l'exécutable de l'application depuis l'image de construction
COPY --from=builder /usr/src/app/target/release/service_auth /usr/local/bin/service_auth

EXPOSE 7070

# Définit la commande par défaut à exécuter
CMD ["/usr/local/bin/service_auth"]
