const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.get('MongoDB.mongoURI'), {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;