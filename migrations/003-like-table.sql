--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Like (
  id        INTEGER     PRIMARY KEY,
  note_id   INTEGER     NOT NULL,
  user_id   INTEGER     NOT NULL,
  is_liked  BOOLEAN     DEFAULT 0,

  CONSTRAINT Like_fk_note_id FOREIGN KEY (note_id)
    REFERENCES Note (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT Like_fk_user_id FOREIGN KEY (user_id)
    REFERENCES User (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX Like_fk_note_id ON Like (note_id);
CREATE INDEX Like_fk_user_id ON Like (user_id);


--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX Like_fk_note_id;
DROP INDEX Like_fk_user_id;
DROP TABLE Like;
