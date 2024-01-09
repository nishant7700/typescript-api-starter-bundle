import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
const API = '/api/branches/';

it('It should delete record and return 200 ', async () => {
  const branch = {
    branch_name: 'Branch 1',
    branch_identifier: 'branch1',
    is_active: true,
    is_in_filter: true,
    show_on_dashboard: true,
  };

  const response = await request(app)
    .post(API + 'add')
    .send(branch)
    .expect(201);

  const branch_id = response.body._id;
  await request(app)
    .delete(API + branch_id)
    .send()
    .expect(200);
});

it('It should get record and return 400 ', async () => {
  await request(app)
    .delete(API + 'ajsfalsjfalsdjfaljsdf')
    .send()
    .expect(400);
});
it('It should get record and return 404 ', async () => {
  const id = new mongoose.Types.ObjectId();
  await request(app)
    .delete(API + id)
    .send()
    .expect(404);
});
