BEGIN;

DROP TABLE IF EXISTS users, sessions, cats, cat_names, votes CASCADE;

SET timezone = 'Europe/London';

CREATE TABLE users (
  id serial primary key,
  name varchar(255) NOT NULL,
  email text unique not NULL,
  password text not null
);

CREATE TABLE sessions (
    sid text primary key,
    data json not null
);

CREATE TABLE cats(
    id serial primary key,
    picture bytea not null,
    description text not null,
    user_id integer references users(id) ON DELETE CASCADE,
    created_at timestamp
);

CREATE TABLE cat_names(
    id serial primary key,
    name varchar(255) not null,
    cat_id integer references cats(id),
    votes integer,
    created_at timestamp
);

CREATE TABLE votes(
    user_id integer references users(id),
    name_id integer references cat_names(id)
);

INSERT INTO users (name, email, password) VALUES
('jamdelion','jo@hotmail.com','ejhsfdgeshkd.gsfhskhfks');

INSERT INTO sessions (sid, data) VALUES
('abc123','{"test":"stuff"}');

-- INSERT INTO cats (picture, description, user_id, timestamp) VALUES
-- ();

-- INSERT INTO cat_names (id, name, cat_id, votes, created_at) VALUES
-- ( (SELECT CURRENT_TIMESTAMP));

-- INSERT INTO votes (user_id, cat_id) VALUES
-- ();

COMMIT;
