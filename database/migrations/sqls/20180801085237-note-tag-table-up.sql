CREATE TABLE "Note_Tag" (
  id        INTEGER     PRIMARY KEY,
  note_id   INTEGER     NOT NULL,
  tag_id    INTEGER     NOT NULL,
  UNIQUE (note_id, tag_id),
  CONSTRAINT Note_Tag_fk_note_id FOREIGN KEY (note_id)
    REFERENCES Note (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT Note_Tag_fk_tag_id FOREIGN KEY (tag_id)
    REFERENCES Tag (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX Note_Tag_fk_note_id ON Note_Tag (note_id);
CREATE INDEX Note_Tag_fk_tag_id ON Note_Tag (tag_id);