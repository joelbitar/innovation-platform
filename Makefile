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

build-celery-worker-dev-no-cache:
	docker compose build --no-cache celery-worker-dev
	$(info Done building celery worker)

rebuild-app: build-backend-dev-no-cache build-celery-worker-dev-no-cache
	$(info Done rebuilding app)

rebuild: build-frontend-dev-no-cache rebuild-app
	$(info Done rebuilding)

reset: stop rebuild up
	$(info Done resetting)

up-frontend-dev:
	docker compose up frontend-dev -d

up-backend-dev:
	docker compose up backend-dev -d

up-proxy-dev:
	docker compose up proxy-dev -d

up-redis-dev:
	docker compose up redis-dev -d

up-celery-worker-dev:
	docker compose up celery-worker-dev -d

up: up-redis-dev up-frontend-dev up-backend-dev up-proxy-dev up-celery-worker-dev
	$(info Started)

stop-backend-dev:
	docker compose stop backend-dev

stop-frontend-dev:
	docker compose stop frontend-dev

stop-proxy-dev:
	docker compose stop proxy-dev

stop-redis-dev:
	docker compose stop redis-dev

stop-celery-worker-dev:
	docker compose stop celery-worker-dev

stop: stop-frontend-dev stop-backend-dev stop-proxy-dev stop-celery-worker-dev stop-redis-dev
	$(info Done stopping)

logs:
	docker compose logs -f -n 50 frontend-dev backend-dev celery-worker-dev

restart: stop up
	$(info Done restarting)

test-without-coverage:
	docker compose run backend-dev sh -c "python manage.py test"

test:
	docker compose run backend-dev sh -c "coverage run --source='.' --rcfile='/src/.coveragerc' manage.py test && coverage report && coverage json && coverage html && coverage-threshold"

migrate:
	docker compose run backend-dev sh -c "python manage.py migrate; chmod -R 664 db.sqlite3 && chown -R $(shell id -u):$(shell id -g) db.sqlite3"

makemigrations:
	docker compose run backend-dev sh -c "python manage.py makemigrations && chmod -R 664 */migrations/*.py && chown -R $(shell id -u):$(shell id -g) */migrations/*.py"

generate-openapischema:
	docker compose run backend-dev sh -c "python manage.py spectacular --file openapischema.yml"
	docker compose run backend-dev sh -c "python manage.py spectacular --format openapi-json --file openapischema.json"
	docker compose exec backend-dev sh -c "chmod -R 664 openapischema.* && chown -R $(shell id -u):$(shell id -g) openapischema.*"
	mv backend/openapischema.* .

generate-frontend-api-service: generate-openapischema
	docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i /local/openapischema.yml -g typescript-axios -o /local/frontend/src/lib/api
	cp openapischema.yml frontend/openapischema.yml
	#docker compose run frontend-dev sh -c "./node_modules/openapi-typescript-codegen/bin/index.js --input openapischema.yml --output src/lib/api --request src/lib/__apiServiceCustomRequest.ts"
	docker compose run frontend-dev sh -c "./node_modules/openapi-typescript-codegen/bin/index.js --input openapischema.yml --output src/lib/api --name ApiClient"
	docker compose run frontend-dev sh -c "chmod -R 774 src/lib/api && chown -R $(shell id -u):$(shell id -g) src/lib/api"
	rm frontend/openapischema.yml

generate-api-client: generate-openapischema
	#docker compose run frontend-dev sh -c "./node_modules/openapi-typescript/bin/cli.js openapischema.yml -o src/lib/api/schema.d.ts"
	docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i /local/openapischema.yml -g typescript-axios -o /local/frontend/src/lib/api

generate-frontend-permissions:
	docker compose run backend-dev sh -c "python manage.py generate_permissions_jsx temp_generated_permissions.jsx; chmod -R 664 temp_generated_permissions.jsx && chown -R $(shell id -u):$(shell id -g) temp_generated_permissions.jsx"
	mv backend/temp_generated_permissions.jsx frontend/src/lib/userPermissions.tsx

show_urls:
	docker compose run backend-dev sh -c "python manage.py show_urls"

createsuperuser:
	docker compose run backend-dev sh -c "python manage.py createsuperuser"

shell_plus:
	docker compose run backend-dev sh -c "python manage.py shell_plus"

generate_api_key:
	docker compose run backend-dev sh -c "python manage.py shell_plus -c \"print(APIKey.objects.create_key(name='frontend'))\""

init: build migrate createsuperuser generate_api_key
	$(info Done initializing)

prune:
	docker system prune --all --force
	$(info Pruned)

proxy-dev-reload:
	docker compose exec proxy-dev nginx -s reload

