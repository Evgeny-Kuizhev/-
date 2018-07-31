--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Tag (
  id        INTEGER     PRIMARY KEY,
  title     TEXT        NOT NULL
);

CREATE TABLE Note_Tag (
  id        INTEGER     PRIMARY KEY,
  note_id   INTEGER     NOT NULL,
  tag_id    INTEGER     NOT NULL,
  CONSTRAINT Note_Tag_fk_note_id FOREIGN KEY (note_id)
    REFERENCES Note (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT Note_Tag_fk_tag_id FOREIGN KEY (tag_id)
    REFERENCES Tag (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX Note_Tag_fk_note_id ON Note_Tag (note_id);
CREATE INDEX Note_Tag_fk_tag_id ON Note_Tag (tag_id);


--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX Note_Tag_fk_note_id;
DROP INDEX Note_Tag_fk_tag_id;
DROP TABLE Note_Tag;
DROP TABLE Tag;