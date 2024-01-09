import request from 'supertest';
import { app } from '../../../app';
const API = '/api/branches/add';

it('It should create record and return 201 ', async () => {
  const branch = {
    branch_name: 'Branch 1',
    branch_identifier: 'branch1',
    is_active: true,
    is_in_filter: true,
    show_on_dashboard: true,
  };

  await request(app).post(API).send(branch).expect(201);
});

it('It should return 400 if branch name is not provided', async () => {
  const branch = {
    branch_identifier: 'branch1',
    is_active: true,
    is_in_filter: true,
    show_on_dashboard: true,
  };

  await request(app).post(API).send(branch).expect(400);
});
