DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS socialnetwork;

  CREATE TABLE socialnetwork(
     id SERIAL PRIMARY KEY,
     first VARCHAR NOT NULL,
     last VARCHAR NOT NULL,
     email_address VARCHAR UNIQUE NOT NULL,
     imageurl VARCHAR,
     bio VARCHAR,
     hashed_password VARCHAR NOT NULL
 );

  CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES socialnetwork(id) NOT NULL,
   recipient_id INT REFERENCES socialnetwork(id) NOT NULL,
   accepted BOOLEAN DEFAULT false
);