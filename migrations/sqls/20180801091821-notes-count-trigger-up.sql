-- изменяю таблицу пользователь и добавляю столбец
-- кол-во записей со значением 0
ALTER TABLE User
ADD notes_count INTEGER DEFAULT 0;

-- создаю триггер увеличение записей
CREATE TRIGGER incr_notes_count
AFTER INSERT ON Note
FOR EACH ROW
BEGIN
  UPDATE User SET notes_count=notes_count+1
   WHERE id=NEW.user_id;
END;

-- создаю триггер уменьшение записей
CREATE TRIGGER decr_notes_count
AFTER DELETE ON Note
FOR EACH ROW
BEGIN
  UPDATE User SET notes_count=notes_count-1
   WHERE id=OLD.user_id;
END;