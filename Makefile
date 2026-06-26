# api

api:
	cd tradescout-api && npm start

install-api:
	cd tradescout-api && npm i


# ui

ui:
	cd tradescout-ui && npm run dev

install-ui:
	cd tradescout-ui && npm i



# app

dev: api ui

install: install-api install-ui

# docker

build: 
	docker compose build

up: 
	docker compose up -d

down: 
	docker compose down

restart: down build up