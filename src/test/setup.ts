import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const user = {
    email: 'test@test.com',
    password: 'password',
    first_name: 'Nishant',
    last_name: 'Tripathi',
    phone: 8447571177,
    nationality: 'India',
    country_code: '+91',
    confirm_password: 'password',
  };

  const response = await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);

  return response.body.token;
};
