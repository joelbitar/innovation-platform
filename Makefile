build-frontend:
	docker compose build frontend-dev

build-backend:
	docker compose build backend-dev

build: build-frontend build-backend
	$(info Done building)

build-frontend-no-cache:
	docker compose build --no-cache frontend-dev
	$(info Done building frontend)

build-backend-no-cache:
	docker compose build --no-cache backend-dev
	$(info Done building backend)

rebuild: stop build-frontend-no-cache build-backend-no-cache
	$(info Done rebuilding)

up:
	docker compose up frontend-dev -d
	docker compose up backend-dev -d
	docker compose up proxy-dev -d

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