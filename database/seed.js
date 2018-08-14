'use strict';

module.exports = (db) => {
    // Users
    db.run(`INSERT INTO User (username, password, email, phone, birthday) VALUES
        ("Petya", "password123", "pet@yandex.ru", 89896348563, NULL),
        ("Vasya", "password123", "vas@yandex.ru", 89896311163, "11.15.1999"),
        ("Kolya", "password123", "kol@yandex.ru", NULL, NULL),
        ("Dasha", "password123", "dash@yandex.ru", 89596348513, NULL),
        ("Lena", "password123", "len@yandex.ru", NULL, "03.04.1995"),
        ("Vanya", "password123", "van@yandex.ru", 79896344443, NULL),
        ("Marina", "password123", "mar@yandex.ru", 89896343333, "01.02.2001");
        `, (err) => console.log(err)
    );

    // Notes
    db.run(`INSERT INTO Note (user_id, title) VALUES
        (1, "Похудеть на 5 кг"),
        (1, "Выучить англ"),
        (2, "Отдохнуть"),
        (3, "Подучить typescript"),
        (1, "Купить машину"),
        (2, "Начать бегать"),
        (4, "Прочитать книги"),
        (3, "Лечь пораньше")
    `, (err) => console.log(err)
    );

    // Tags
    db.run(`INSERT INTO Tag (title) VALUES
        ("sport"),
        ("fitness"),
        ("want"),
        ("porrammimg"),
        ("it"),
        ("relax"),
        ("study"),
        ("aims")
    `, (err) => console.log(err)
    );

    // Принадлежность тега записки
    db.run(`INSERT INTO Note_Tag (note_id, tag_id) VALUES
        (1, 1),
        (2, 7),
        (1, 2),
        (4, 4),
        (4, 5),
        (7, 7),
        (5, 3),
        (3, 6)
    `, (err) => console.log(err)
    );

    // Like
    db.run(`INSERT INTO Like (note_id, user_id) VALUES
        (1, 1),
        (2, 7),
        (1, 2),
        (3, 4),
        (3, 5),
        (7, 7),
        (5, 3),
        (3, 6)
    `, (err) => console.log(err)
    );
}