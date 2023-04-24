SELECT setval('"txn_addresses_addressId_seq"', (SELECT MAX("addressId") FROM txn_addresses)+1);
-- Database: vishwakarma

-- DROP DATABASE vishwakarma;

CREATE DATABASE vishwakarma
  WITH
OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'English_India.1252'
  LC_CTYPE = 'English_India.1252'
TABLESPACE = pg_default
CONNECTION LIMIT = -1;

COMMENT ON DATABASE vishwakarma
IS 'Database for Vishwakarma';