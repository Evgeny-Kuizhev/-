CREATE TABLE "User" (
  id        INTEGER     PRIMARY KEY,
  username  TEXT        NOT NULL    UNIQUE,
  email     TEXT        NOT NULL    UNIQUE,
  phone     INTEGER     UNIQUE,
  birthday  DATE,
  notes_count INTEGER DEFAULT 0
);