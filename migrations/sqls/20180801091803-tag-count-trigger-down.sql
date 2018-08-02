DROP TRIGGER incr_tags_count;
DROP TRIGGER decr_tags_count;

ALTER TABLE Note
DROP COLUMN tags_count;