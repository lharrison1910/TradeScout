api:
	cd tradescout-api && npm start

ui:
	cd tradescout-ui && npm run dev


dev: api ui

# docker

build: 
	docker compose build

up: 
	docker compose up -d

down: 
	docker compose down

restart: down build up