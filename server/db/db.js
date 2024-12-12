const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const crypto = require('crypto'); // Импортируем модуль crypto

let db;

const hashPassword = (password) => {
    return crypto.createHash('md5').update(password).digest('hex'); // Хеширование с помощью MD5
};

const initDb = async () => {
    // Открыть базу данных
    if (!db) {
        db = await open({
            filename: 'database.db',
            driver: sqlite3.Database
        });
    }

    // Создание таблиц
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            type TEXT NOT NULL
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT NOT NULL,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            price REAL NOT NULL,
            categoryId INTEGER,
            stock INTEGER DEFAULT 0,
            FOREIGN KEY (categoryId) REFERENCES categories(id)
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            total REAL NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            orderId INTEGER NOT NULL,
            productId INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (productId) REFERENCES products(id)
        )
    `);
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )
    `);
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cart_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cartId INTEGER NOT NULL,
            productId INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (cartId) REFERENCES cart(id) ON DELETE CASCADE,
            FOREIGN KEY (productId) REFERENCES products(id)
        )
    `);
    

    // Хеширование паролей для начальных данных
    const hashedPassword1 = hashPassword('p1');
    const hashedPassword2 = hashPassword('p2');
    const hashedPassword3 = hashPassword('a1');
    const hashedPassword4 = hashPassword('p3');

    // Начальные данные в таблицу пользователей
    await db.run(`
        INSERT INTO users (login, password, type) 
        VALUES 
        ('u1', ?, '1'),
        ('u2', ?, '1'), 
        ('a1', ?, '2'),
        ('u3', ?, '1')
        ON CONFLICT(login) DO NOTHING;
    `, [hashedPassword1, hashedPassword2, hashedPassword3, hashedPassword4]);

    // Начальные данные в таблицу категорий
    await db.run(`
        INSERT INTO categories (name) 
        VALUES 
        ('Иглы и расходники'),
        ('Чернила'),
        ('Оборудование'),
        ('Аксессуары'),
        ('Книги и обучающие материалы')
        ON CONFLICT(name) DO NOTHING;
    `);

    // Начальные данные в таблицу товаров
    await db.run(`
        INSERT INTO products (name, description, price, categoryId, stock) 
        VALUES 
        ('Иглы для татуировки 0.30mm', 'Набор игл для татуировки, 50 штук', 20.00, 1, 100),
        ('Чернила для татуировки 30ml Black', 'Черное чернило для татуировки, 30 мл', 15.00, 2, 50),
        ('Тату-машинка профессиональная', 'Профессиональная тату-машинка, производитель ABC', 200.00, 3, 20),
        ('Сумка для тату-оборудования', 'Сумка для удобного переноски тату-оборудования', 40.00, 4, 30),
        ('Книга по татуировке: Основы техники', 'Учебник по татуировке для начинающих', 25.00, 5, 15),
        ('Иглы для татуировки 0.25mm', 'Набор игл для татуировки, 50 штук', 20.00, 1, 90),
        ('Чернила для татуировки 30ml Red', 'Красное чернило для татуировки, 30 мл', 15.00, 2, 45),
        ('Тату-машинка роторного типа', 'Роторная тату-машинка, легкая и удобная в использовании', 250.00, 3, 18),
        ('Набор Аксессуаров для татуировщика', 'Набор аксессуаров: перчатки, спирт, трафареты', 60.00, 4, 22),
        ('Антибактериальный гель для рук', 'Гель для дезинфекции рук, 500 мл', 10.00, 4, 75)
        ON CONFLICT(name) DO NOTHING;
    `);

    // Начальные данные в таблицу заказов
    await db.run(`
        INSERT INTO orders (userId, total) 
        VALUES 
        (1, 130.00),
        (2, 250.00),
        (1, 75.00),
        (3, 200.00);
    `);

    // Начальные данные в таблицу элементов заказа
    await db.run(`
        INSERT INTO order_items (orderId, productId, quantity, price) 
        VALUES 
        (1, 1, 2, 20.00),
        (1, 2, 1, 15.00),
        (2, 3, 1, 200.00),
        (2, 4, 1, 40.00),
        (3, 5, 2, 25.00),
        (4, 2, 5, 15.00),
        (4, 3, 1, 200.00);
    `);
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
};
