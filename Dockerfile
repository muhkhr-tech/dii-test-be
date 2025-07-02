FROM postgres:12

ENV POSTGRES_PASSWORD=123

ENV POSTGRES_DB=dii_test_db

COPY init.sql /docker-entrypoint-initdb.d