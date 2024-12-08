const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const { initDb } = require("./db/db"); // Убедитесь, что файл db.js создан

const app = express();

app.use(express.json());
app.use(cookies());
app.use(cors({ credentials: true, origin: true }));

app.get("/", (req, res) => {
    res.status(200).json({ ok: true });
});

const port = process.env.PORT || 5000;
(async () => {
    await initDb();
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
})();
