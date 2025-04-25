const mongoose = require('mongoose');



const connectDB = async () => {
  try {
    const uri = "mongodb+srv://poornainvest0:OZ2n6S6rqscIam70@kdu.qt4orxc.mongodb.net/?retryWrites=true&w=majority&appName=KDU";
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
