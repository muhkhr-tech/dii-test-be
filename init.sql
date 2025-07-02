-- Create database if not exists
DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'dii_test_db'
   ) THEN
      CREATE DATABASE dii_test_db;
   END IF;
END
$$;