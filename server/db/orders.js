class Orders {
    constructor(db) {
        this.db = db;
    }

    // Вставка нового заказа
    async createOrder(userId, total) {
        const query = `INSERT INTO orders (userId, total) VALUES (?, ?)`;
        await this.db.run(query, [userId, total]);
    }

    // Получение всех заказов
    async getAllOrders() {
        const query = `SELECT * FROM orders`;
        const rows = await this.db.all(query);
        return rows;
    }

    // Получение заказов по пользователю
    async getOrdersByUser(userId) {
        const query = `SELECT * FROM orders WHERE userId = ?`;
        const rows = await this.db.all(query, [userId]);
        return rows;
    }

    // Удаление заказа
    async deleteOrder(id) {
        const query = `DELETE FROM orders WHERE id = ?`;
        await this.db.run(query, [id]);
    }
}

module.exports = Orders;