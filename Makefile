.PHONY: help all jwt front api-gateway auth clean run setup

help:
	@echo "\nUsage:\n"
	@echo "  make all            Build docker: All Services"
	@echo "  make local          Build docker: All Services in 1 DockerCompose"
	@echo "  make jwt            Build docker: Service_JWT"
	@echo "  make auth           Build docker: Service_Auth"
	@echo "  make front          Build docker: Front"
	@echo "  make reservation    Build docker: Reservation"
	@echo "  make api-gateway    Build docker: Api_Gateway"
	@echo "  make clean          Remove images and containers"
	@echo "  make clean-local    Remove images and containers"
	@echo "  make run            Start all services"
	@echo "  make run-local      Start all services in 1 DockerCompose"
	@echo "  make setup          Setup all\n"

all: front jwt auth api-gateway

local:
	@echo
	@echo "Building Service_JWT Docker image..."
	@echo "Building Front Docker image..."
	@echo "Building Service_Auth Docker image..."
	@echo "Building Api_Gateway Docker image..."
	@docker compose -f ./docker-compose.yml build --force-rm

jwt:
	@echo
	@echo "Building Service_JWT Docker image..."
	@docker compose -f ./service_jwt/docker-compose.yml build --force-rm

front:
	@echo
	@echo "Building Front Docker image..."
	@docker compose -f ./silver_micro/docker-compose.yml build --force-rm

auth:
	@echo
	@echo "Building Service_Auth Docker image..."
	@docker compose -f ./service_auth/docker-compose.yml build --force-rm

api-gateway:
	@echo
	@echo "Building Api_Gateway Docker image..."
	@docker compose -f ./service_api_gateway/docker-compose.yml build --force-rm

reservation:
	@echo
	@echo "Building Service_Reservation Docker image..."
	@docker compose -f ./service_reservation/docker-compose.yml build --force-rm

clean:
	@echo
	@echo "Stopping and removing containers..."
	@docker compose -f ./service_jwt/docker-compose.yml down --rmi all
	@docker compose -f ./service_auth/docker-compose.yml down --rmi all
	@docker compose -f ./silver_micro/docker-compose.yml down --rmi all
	@docker compose -f ./service_api_gateway/docker-compose.yml down --rmi all 
	@docker compose -f ./service_reservation/docker-compose.yml down --rmi all 

clean-local:
	@echo
	@echo "Stopping and removing containers..."
	@docker compose -f ./docker-compose.yml down --rmi all

setup:
	@echo "Setup"
	@echo "Creating network micro_service"
	@docker network create --driver bridge micro_service

run:
	@echo "Starting all services..."
	@docker compose -f ./service_jwt/docker-compose.yml up -d
	@docker compose -f ./service_auth/docker-compose.yml up -d
	@docker compose -f ./silver_micro/docker-compose.yml up -d
	@docker compose -f ./service_api_gateway/docker-compose.yml up -d
	@docker compose -f ./service_reservation/docker-compose.yml up -d

run-local:
	@echo "Starting all services..."
	@docker compose -f ./docker-compose.yml up -d
