const mongoose = require('mongoose');
const os = require('os');

// console.log(os.freemem());
// console.log(os.version());
// console.log(os.uptime());
// console.log(os.userInfo());
// console.log(os.arch());
// console.log(os.constants);
// console.log(os.cpus());
// console.log(os.devNull);
// console.log(os.endianness());
// console.log(os.EOL);
console.log(os.homedir());
console.log(os.hostname());

const dotenv = require('dotenv');

dotenv.config('.env');
const app = require('./app');

const DB = process.env.MONGODB_CONNECT;

mongoose.connect(DB).then(() => {
  console.log('connected successfully to mongoDB ✅');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
