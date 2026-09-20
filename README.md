# Storefront REST API

A storefront backend — users, products, orders — built as a REST API over PostgreSQL.

## Stack

Express · TypeScript · PostgreSQL (`pg`) · JWT · bcrypt · db-migrate · Jasmine

## Features

- JWT authentication with bcrypt-hashed passwords
- Products, users and orders with their relationships modelled in SQL
- Versioned schema via `db-migrate` migrations
- Endpoint and model tests with Jasmine and supertest

## Running it

```bash
npm install
db-migrate up
npm run start
```

Database and JWT settings come from environment variables — see `REQUIREMENTS.md` for the full endpoint and schema specification.

## Tests

```bash
npm run test
```
