DROP TABLE IF EXISTS socialnetwork;

  CREATE TABLE socialnetwork(
     id SERIAL PRIMARY KEY,
     first VARCHAR NOT NULL,
     last VARCHAR NOT NULL,
     email_address VARCHAR UNIQUE NOT NULL,
     hashed_password VARCHAR NOT NULL
 );