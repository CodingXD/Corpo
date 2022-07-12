# Getting Started

To start using the project, do the following

- Setup PostgreSQL
- Set environmental variables

## Setup PostgreSQL

I prefer Docker for faster local development, simply run the below command from the corpo-server directory using Powershell

```bash
docker run --name postgres -e POSTGRES_PASSWORD=... -e POSTGRES_USER=... -e POSTGRES_DB=... -v ${pwd}/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d -d -p 5432:5432 postgres
```

This is create the tables in the database

## Set environmental variables

Create a `.env` file with the following contents

```
CONNECTION_STRING=postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB
PORT=3001
```

Replace `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB` with values set in the docker command

## Start Server

### `npm i`

To install the dependencies

### `npm run dev`

To start the server in dev mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the postman.

### `npm start`

For production mode

## Start UI

### `npm i`

To install the dependencies

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

To build for production
