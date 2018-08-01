-- изменяю таблицу записки и добавляю столбец
-- кол-во тэгов со значением 0
ALTER TABLE Note
ADD tag_count INTEGER DEFAULT 0;

-- создаю триггер
CREATE TRIGGER incr_tag_count
AFTER INSERT ON Note_Tag
FOR EACH ROW
BEGIN
  UPDATE Note SET tag_count=tag_count+1
   WHERE id=NEW.note_id;
END;