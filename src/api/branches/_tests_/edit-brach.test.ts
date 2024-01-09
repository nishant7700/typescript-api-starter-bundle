import request from 'supertest';
import { app } from '../../../app';
const API = '/api/branches/';

it('It should create record and return 202 ', async () => {
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
  const updated_branch = {
    branch_name: 'Branch 2',
    branch_identifier: 'branch2',
    is_active: false,
    is_in_filter: false,
    show_on_dashboard: false,
  };
  console.log(response.body);

  await request(app)
    .put(API + response.body._id + '/edit')
    .send(updated_branch)
    .expect(202);
});

it('It should return 400 if branch name is not provided', async () => {
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
  const updated_branch = {
    // branch_name: 'Branch 2',
    branch_identifier: 'branch2',
    is_active: false,
    is_in_filter: false,
    show_on_dashboard: false,
  };

  await request(app)
    .put(API + response.body._id + '/edit')
    .send(updated_branch)
    .expect(400);
});
