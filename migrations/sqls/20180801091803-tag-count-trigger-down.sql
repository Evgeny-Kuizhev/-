DROP TRIGGER incr_tags_count;
DROP TRIGGER decr_tags_count;

BEGIN TRANSACTION;
CREATE TEMPORARY TABLE t_backup(
  id        INTEGER     PRIMARY KEY,
  user_id   INTEGER     NOT NULL,
  title     TEXT        NOT NULL,
  UNIQUE (user_id, title),

  CONSTRAINT Note_fk_user_id FOREIGN KEY (user_id)
    REFERENCES "User" (id) ON UPDATE CASCADE ON DELETE CASCADE
);
INSERT INTO t_backup SELECT id, user_id, title FROM Note;
DROP TABLE Note;
ALTER TABLE t_backup RENAME TO Note;
COMMIT;