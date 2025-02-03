build-frontend:
	docker compose build frontend-dev

build-backend:
	docker compose build backend-dev

build: build-frontend build-backend
	$(info Done building)

build-frontend-dev-no-cache:
	docker compose build --no-cache frontend-dev
	$(info Done building frontend)

build-backend-dev-no-cache:
	docker compose build --no-cache backend-dev
	$(info Done building backend)

rebuild: build-frontend-dev-no-cache build-backend-dev-no-cache
	$(info Done rebuilding)

reset: stop rebuild up
	$(info Done resetting)

up-frontend-dev:
	docker compose up frontend-dev -d

up-backend-dev:
	docker compose up backend-dev -d

up-proxy-dev:
	docker compose up proxy-dev -d

up: up-frontend-dev up-backend-dev up-proxy-dev
	$(info Started)

stop:
	docker stop $$(docker ps -aqf "name=ip_") || true

logs:
	docker compose logs -f

restart: stop up
	$(info Done restarting)

test:
	docker compose run backend-dev sh -c "python manage.py test"

migrate:
	docker compose run backend-dev sh -c "python manage.py migrate; chmod -R 664 db.sqlite3 && chown -R $(shell id -u):$(shell id -g) db.sqlite3"

makemigrations:
	docker compose run backend-dev sh -c "python manage.py makemigrations && chmod -R 664 */migrations/*.py && chown -R $(shell id -u):$(shell id -g) */migrations/*.py"

generate-api-client:
	docker compose run backend-dev sh -c "python manage.py generateschema --file openapischema.yml; chmod -R 664 openapischema.yml && chown -R $(shell id -u):$(shell id -g) openapischema.yml"
	mv backend/openapischema.yml frontend/openapischema.yml
	docker compose run frontend-dev sh -c "./node_modules/openapi-typescript-codegen/bin/index.js --input openapischema.yml --output src/lib/api"
	docker compose run frontend-dev sh -c "chmod -R 774 src/lib/api && chown -R $(shell id -u):$(shell id -g) src/lib/api"

