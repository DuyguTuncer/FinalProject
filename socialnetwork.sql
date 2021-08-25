DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS location_likes;
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

CREATE TABLE messages(
   id SERIAL PRIMARY KEY,
   text VARCHAR NOT NULL,
   user_id INT REFERENCES socialnetwork(id) NOT NULL,
   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

CREATE TABLE location_likes(
    id SERIAL,
    user_id INT NOT NULL REFERENCES socialnetwork(id),
    trail_id INT NOT NULL,
    address VARCHAR(200),
    title VARCHAR(200),
    PRIMARY KEY (user_id, trail_id)
);

CREATE TABLE comments(
    id SERIAL,
    user_id INT NOT NULL REFERENCES socialnetwork(id),
    trail_id INT NOT NULL,
    commnet VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

