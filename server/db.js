const mongoose = require('mongoose');

const connectDB = async (MONGO_URL) => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('DB Connected');
    })
    .catch((e) => console.log(e));
};

module.exports = connectDB;
