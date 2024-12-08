class OrderItems {
    constructor(db) {
        this.db = db;
    }

    // Вставка новой детали заказа
    async createOrderItem(orderId, productId, quantity, price) {
        const query = `INSERT INTO order_items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`;
        await this.db.run(query, [orderId, productId, quantity, price]);
    }

    // Получение всех деталей заказа
    async getAllOrderItems() {
        const query = `SELECT * FROM order_items`;
        const rows = await this.db.all(query);
        return rows;
    }

    // Получение деталей заказа по заказу
    async getOrderItemsByOrder(orderId) {
        const query = `SELECT * FROM order_items WHERE orderId = ?`;
        const rows = await this.db.all(query, [orderId]);
        return rows;
    }

    // Удаление детали заказа
    async deleteOrderItem(id) {
        const query = `DELETE FROM order_items WHERE id = ?`;
        await this.db.run(query, [id]);
    }
}

module.exports = OrderItems;