const express = require('express');
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/products-route');
const shopProductRouter = require('./routes/shop/products-route');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-route');

dotenv.config({});

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const _dirname = path.resolve();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://ecommercemern-pzo0.onrender.com',
      'http://localhost:8080',
    ],
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    allowedHeaders: [
      'Content-Type',
      'Expires',
      'Pragma',
      'Cache-Control',
      'Authorization',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/shop/products', shopProductRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);

app.use(express.static(path.join(_dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`PORT is running on ${PORT}`);
  connectDB(MONGO_URL);
});
