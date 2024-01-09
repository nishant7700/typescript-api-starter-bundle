import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// if (process.env.NODE_ENV && process.env.NODE_ENV != 'production') {
//   const configFile = `../env.dev`;
//   console.log('PATH', __dirname + `../.env.${process.env.NODE_ENV}`);

//   dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
// } else {
//   dotenv.config();
// }
dotenv.config();

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
