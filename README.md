# Task
```MD
## Backend Position Technical Task
Implement REST API that allows users to:
- Lookup for a particular IP address info via https://ipwhois.io/ and store in to DB
- Response with a stored lookup info from DB in case the spefic IP was already searched (DB-caching)
- Remove cached result by IP
- Cache should be auto-removed after TTL of 60 seconds, so only the cache result would be updated each 60 seconds for the particular IP address 

### Required parts
- SQL or noSQL database or file
- Typescript
- Clean Architecture

### Up to candidate
- Tests
- Deployment infrastructure preparation (Docker, Serverless, etc.)
```

# Project setup
Boilerplate inspired by https://github.com/brocoders/nestjs-boilerplate

## Quick run (Docker mode)

1. Copy `.env.example` as `.env`.

   ```bash
   cp .env.example .env
   ```

2. Run containers

   ```bash
   docker compose up -d
   ```

3. For check status run

   ```bash
   docker compose logs
   ```

4. Open Swagger docs <http://localhost:3000/docs>

To reset docker:
```bash
docker compose down -v --remove-orphans
```

## Development Mode

1. Env config
    **For local development: clone `.env.example` into `.env` and set appropriate keys**
    ```bash
    cp .env.example .env
    ```

2. Change `DATABASE_HOST=postgres` => `DATABASE_HOST=localhost` 
   and `REDIS_HOST=redis` => `REDIS_HOST=localhost`

3. Run additional container:

   ```bash
   docker compose up -d postgres redis
   ```

4. Install dependency

   ```bash
   npm install
   ```

5. Run migrations

   ```bash
   npm run migration:run
   ```

6. Run app in dev mode

   ```bash
   npm run start:dev
   ```

7. Open Swagger docs <http://localhost:3000/docs>

# Run tests
### E2E in Docker mode

```bash
npm run test:e2e:docker
```

### Unit Tests
> ⚠️ Make sure to complete the Development Mode setup before this

```bash
# just run unit tests
npm run test
# or
# unit test coverage
npm run test:cov
```

### E2E Tests

>  ⚠️ E2E tests by default requires a running app, make sure to complete the Development Mode setup before this
> and run `npm run start:prod`.
> Otherwise use "E2E in Docker mode"
```bash

npm run test:e2e
```

# Deployment 

The app is ready to be deployed using Docker: see [Dockerfile](./Dockerfile) 

# Tasks:
- [x] API to get IP details based on https://ipwhois.io/documentation
- [x] Caching IP data in Redis - short term (60s)
- [x] Caching IP data in PostgreSQL DB - long term
- [x] Remove stored data by IP
- [x] Env var validation using class validator (see example [database-config](./src/database/config/database.config.ts))
- [x] OpenAPI - swagger docs (available on `/docs`)
- [x] Unit and E2E tests
