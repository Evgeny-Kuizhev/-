CREATE TABLE "Note" (
  id        INTEGER     PRIMARY KEY,
  user_id   INTEGER     NOT NULL,
  title     TEXT        NOT NULL,
  UNIQUE (user_id, title),

  CONSTRAINT Note_fk_user_id FOREIGN KEY (user_id)
    REFERENCES "User" (id) ON UPDATE CASCADE ON DELETE CASCADE
);
