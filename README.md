# Task

## Backend Position Technical Task
Implement REST API that allows users to:
- [ ] Lookup for a particular IP address info via https://ipwhois.io/ and store in to DB
- [ ] Response with a stored lookup info from DB in case the spefic IP was already searched (DB-caching)
- [ ] Remove cached result by IP
- [ ] Cache should be auto-removed after TTL of 60 seconds, so only the cache result would be updated each 60 seconds for the particular IP address 

### Required parts
- [ ] SQL or noSQL database or file
- [ ] Typescript
- [ ] Clean Architecture

### Up to candidate
- [ ] Tests
- [ ] Deployment infrastructure preparation (Docker, Serverless, etc.)


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

PostgreSQL + TypeORM

## Project setup

1. Env config
    **For local development: clone `.env.example` into `.env` and set appropriate keys**
    ```bash
    cp .env.example .env
    ```
    
    ```bash
    docker compose up -d
    ```

2. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

3. Run additional container:

   ```bash
   docker compose up -d postgres
   ```

4. Install dependency

   ```bash
   npm install
   ```

5. Run migrations

   ```bash
   npm run migration:run
   ```

6. Run seeds

   ```bash
   npm run seed:run
   ```

7. Run app in dev mode

   ```bash
   npm run start:dev
   ```

8. Open <http://localhost:3000>

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment TBD

[//]: # (TODO document)
