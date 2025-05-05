# Project Setup

This is a project that requires certain environment variables to be set and dependencies installed. Below are the
instructions to get your project up and running.

## Environment Variables

Before you start the project, make sure to configure the following environment variables by creating a `.env` file in
the root of your project:

### Explanation of Environment Variables:

- `PORT`: The port the application will run on (default is `3000`).
- `USER_AUTH_SECRET`: Secret key used for authentication (for JWT, for example).
- `DB_HOST`: Host for your database (e.g., `localhost`, or an external database URL).
- `DB_USER`: Username for accessing the database.
- `DB_PASSWORD`: Password for the database user.
- `DB_DATABASE`: The name of the database to connect to.
- `MAIL_USER`:
- `MAIL_PASSWORD` :

## Installing Dependencies

Install the necessary dependencies using Yarn:

yarn install

Starting the Application
yarn start
