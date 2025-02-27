# innovation-platform

## Autogeneration of JavaScript types and APIs

This is done by first geetting an openapi specficication from the backend
and then processing it with openapi-typescript-codegen https://github.com/ferdikoomen/openapi-typescript-codegen


## How to run

### Env variables
Set environment variables in .env files in `frontend` and `backend` folders.
there is a corresponding `.env-sample` file in each folder.
Copy these to `.env` and fill in the values.

These are automatically picked up by docker-compose.

#### Backend API key
This ia API key that needs to be configured in the backend. It is used to authenticate the frontend.

You can generate this in two ways;

##### Manually by following these steps (for production and development)
1. Start up the backend
2. Go to the backend admin url in a browser (for local dev its http://localhost:8000/admin/)
3. Log in with the superuser credentials
4. Go to the `API keys` section
5. Add a new API key with the name `frontend` and save it
6. Copy the key and paste it in the `frontend` .env file

##### Automatically by running make target (for development)
1. Run `make generate_api_key` in the root folder
