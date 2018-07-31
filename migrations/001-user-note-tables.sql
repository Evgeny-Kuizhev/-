--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE User (
  id        INTEGER     PRIMARY KEY,
  username  TEXT        NOT NULL,
  email     TEXT        NOT NULL,
  phone     INTEGER,
  birthday  DATE
);

CREATE TABLE Note (
  id        INTEGER     PRIMARY KEY,
  user_id   INTEGER     NOT NULL,
  title     TEXT        NOT NULL,
  CONSTRAINT Note_fk_user_id FOREIGN KEY (user_id)
    REFERENCES User (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX Note_ix_user_id ON Note (user_id);

INSERT INTO User (id, username, email) VALUES (1, 'Testuser', 'test@yandex.ru');

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX Note_ix_user_id;
DROP TABLE Note;
DROP TABLE User;