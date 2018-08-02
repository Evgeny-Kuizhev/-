DROP TRIGGER incr_notes_count;
DROP TRIGGER decr_notes_count;

ALTER TABLE User
DROP COLUMN notes_count;