#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE TABLE companies(id SERIAL PRIMARY KEY, name CHARACTER VARYING(500) NOT NULL, cin CHARACTER VARYING(500) UNIQUE NOT NULL, created_on timestamp with time zone DEFAULT clock_timestamp());
EOSQL