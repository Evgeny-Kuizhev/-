DROP TRIGGER incr_notes_count;
DROP TRIGGER decr_notes_count;

CREATE TABLE t_backup(
  id        INTEGER     PRIMARY KEY,
  username  TEXT        NOT NULL    UNIQUE,
  email     TEXT        NOT NULL    UNIQUE,
  phone     INTEGER     UNIQUE,
  birthday  DATE
);
INSERT INTO t_backup SELECT id, username, email, phone, birthday FROM User;
DROP TABLE User;
ALTER TABLE t_backup RENAME TO User;