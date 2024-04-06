const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config('.env');

const DB = process.env.MONGODB_CONNECT;

mongoose.connect(DB).then(() => {
  console.log('connected successfully to mongoDB ✅');
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
