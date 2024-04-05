const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config('.env');

const DB = process.env.MONGODB_CONNECT;

mongoose.connect(DB).then(() => {
  console.log('connected successfully to mongoDB ✅');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
