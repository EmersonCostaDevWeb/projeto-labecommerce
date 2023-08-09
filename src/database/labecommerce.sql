-- Active: 1691009151898@@127.0.0.1@3306
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NULL DEFAULT(DATETIME('now', 'localtime'))
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        'u01',
        'EmersonCosta',
        'emersoncosta@email.com',
        '123456'
    ), (
        'u02',
        'JoaoPedro',
        'JoaoPedro@emai.com',
        '54321'
    );

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT(DATETIME("now", "localtime")),
        FOREIGN KEY (buyer) REFERENCES users (id)
);

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
