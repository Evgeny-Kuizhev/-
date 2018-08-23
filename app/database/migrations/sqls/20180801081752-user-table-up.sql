CREATE TABLE "User" (
  id        INTEGER     PRIMARY KEY,
  username  TEXT        NOT NULL    UNIQUE,
  password  TEXT        NOT NULL,
  email     TEXT        NOT NULL    UNIQUE,
  phone     INTEGER     UNIQUE,
  birthday  DATE,
  role      INTEGER     DEFAULT 0,
  notes_count INTEGER   DEFAULT 0
);