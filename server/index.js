const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const orderItemsRouter = require('./routes/orderItems');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart'); 
const bodyParser = require('body-parser');
const { initDb } = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); 

app.use('/auth', authRouter);
app.use('/categories', categoriesRouter);
app.use('/orderitems', orderItemsRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);

(async () => {
    await initDb();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();

