const mongoose = require('mongoose');
require('dotenv').config()


// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mixer');
// console.log(process.env.MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;