class Categories {
    constructor(db) {
        this.db = db;
    }

    // Вставка новой категории
    async createCategory(name) {
        const query = `INSERT INTO categories (name) VALUES (?)`;
        await this.db.run(query, [name]);
    }

    // Получение всех категорий
    async getAllCategories() {
        const query = `SELECT * FROM categories`;
        const rows = await this.db.all(query);
        return rows;
    }

    // Обновление категории
    async updateCategory(id, newName) {
        const query = `UPDATE categories SET name = ? WHERE id = ?`;
        await this.db.run(query, [newName, id]);
    }

    // Удаление категории
    async deleteCategory(id) {
        const query = `DELETE FROM categories WHERE id = ?`;
        await this.db.run(query, [id]);
    }
}

module.exports = Categories;