class Products {
    constructor(db) {
        this.db = db;
    }

    // Вставка нового продукта
    async createProduct(name, description, price, categoryId, stock) {
        const query = `INSERT INTO products (name, description, price, categoryId, stock) VALUES (?, ?, ?, ?, ?)`;
        await this.db.run(query, [name, description, price, categoryId, stock]);
    }

    // Получение всех продуктов
    async getAllProducts() {
        const query = `SELECT * FROM products`;
        const rows = await this.db.all(query);
        return rows;
    }

    // Получение продуктов по категории
    async getProductsByCategory(categoryId) {
        const query = `SELECT * FROM products WHERE categoryId = ?`;
        const rows = await this.db.all(query, [categoryId]);
        return rows;
    }

    // Обновление продукта
    async updateProduct(id, name, price, stock) {
        const query = `UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?`;
        await this.db.run(query, [name, price, stock, id]);
    }

    // Удаление продукта
    async deleteProduct(id) {
        const query = `DELETE FROM products WHERE id = ?`;
        await this.db.run(query, [id]);
    }
}

module.exports = Products;