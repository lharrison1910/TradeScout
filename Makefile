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

dev:
	make api
	make ui

install: install-api install-ui

# docker

docker-build: 
	docker compose build

docker-up: 
	docker compose up -d

docker-down: 
	docker compose down

docker-restart: 
	make docker-down 
	make docker-build 
	make docker-up