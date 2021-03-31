# Database Migrations

- Handles all database migrations for My PowerPak
- Because we are using firestore, database migrations aren't always easy. Based on our experience with prior projects, we needed a robust set of tooling that allowed us to maintain and track changes to the database, and apply those changes to the various environments.

## Prerequisites

- set up `gsutil` on your machine
- administrative access to the project(s) google cloud instance

## Quick Start

1. Download secrets by running: `npm run secrets:get`
2. In your terminal run: `npm run start:local`
3. Follow the instructions

Running the script locally uses ts-node. If the start script fails, you may need to install ts-node globally.

## Advanced usage

The script allows for multiple flags:
--project (name of the project)
--cert (location of the admin-sdk cert)
--no-warnings (removes warnings)

Running Locally:
`ts-node src/index.ts run-migrations`

Running after building:
Not Applicapble yet. This will probably be needed when we get the robots set up.

## How it works

1. The user selects the project they want to update
2. The migration script checks to see when the last database migration happened.
3. If there are migrations that haven't been run, the script runs those migrations.
4. Migration script then updates the `migrations` collection in firestore with a date for the completed migrations.
5. If all migrations have been run, migration script finished.

## Creating a new migration

1. Add a function to its related module that changes the database as needed.
2. In `modules/migrations/migrations.service.ts` add the function to the `databaseMigrations` constant.

## Project architecture

- Each "module" matches a collection in firestore. If the module doesn't exist, feel free to create it.
- Seperate queries and logic if possible
  - Queries should go in `module-name.queries.ts`
  - Logic should go in `module-name.service.ts`
- When in doubt, seperate functions into their own file. Keep file size at a manageable level.
