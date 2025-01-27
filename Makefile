up:
	docker compose up frontend-dev -d --build
	docker compose up backend-dev -d --build

test:
	docker compose run backend-dev sh -c "python manage.py test"

migrate:
	docker compose run backend-dev sh -c "python manage.py migrate; chmod -R 664 db.sqlite3 && chown -R $(shell id -u):$(shell id -g) db.sqlite3"

makemigrations:
	docker compose run backend-dev sh -c "python manage.py makemigrations && chmod -R 664 */migrations/*.py && chown -R $(shell id -u):$(shell id -g) */migrations/*.py"
