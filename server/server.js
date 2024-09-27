const express = require('express');
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/products-route');
const shopProductRouter = require('./routes/shop/products-route');

dotenv.config({});

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL =
  process.env.MONGO_URL ||
  'mongodb+srv://Vivek:6326Vivek@cluster0.siom6.mongodb.net/';

app.use(express.static(path.join(__dirname, 'dist')));
app.use(
  cors({
    origin: 'http://localhost:5173',
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

app.listen(PORT, () => {
  console.log(`PORT is running on ${PORT}`);
  connectDB(MONGO_URL);
});
