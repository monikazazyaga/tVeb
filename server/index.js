const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const Categoriesrouter = require("./routes/categoriesRoutes");
const Productrouter = require("./routes/productsRoutes");
const Orderrouter = require("./routes/ordersRoutes");
const OrderItemsrouter = require("./routes/orderItemsRoutes");
const {initDb} = require("./db/db");

const app = express();

// чтобы парсился POST в виде JSON
app.use(express.json());

// чтобы парсились куки
app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/categories", Categoriesrouter);
app.use("/products", Productrouter);
app.use("/orders", Orderrouter);
app.use("/orderItems", OrderItemsrouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(async function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;

    // ошибка рендера страницы
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = process.env.PORT || 3001;
(async () => {
    await initDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    });
})();

