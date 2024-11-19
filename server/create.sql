-- Active: 1719881127625@@127.0.0.1@5432@postapp

\c library;


DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT
    -- , FOREIGN KEY (user_id) REFERENCES users(id)
);

-- CREATE TABLE product_category (
-- post_id UUID NOT NULL,
-- user_id SERIAL NOT NULL,
-- PRIMARY KEY (post_id, user_id),
-- FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
-- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE posts
ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- ALTER TABLE product
-- ALTER COLUMN id DROP DEFAULT;


| examples

INSERT INTO users (username, password) VALUES ('user1', 'password1');
INSERT INTO users (username, password) VALUES ('user2', 'password2');
INSERT INTO users (username, password) VALUES ('user3', 'password3');

INSERT INTO posts (title, content, user_id) VALUES ('title1', 'content1', 1);
INSERT INTO posts (title, content, user_id) VALUES ('title2', 'content2', 2);
INSERT INTO posts (title, content, user_id) VALUES ('title3', 'content3', 3);

