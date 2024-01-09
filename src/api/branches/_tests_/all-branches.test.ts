import request from 'supertest';
import { app } from '../../../app';
import e from 'express';
const API = '/api/branches/';

// before each test
beforeEach(async () => {
  await request(app)
    .post(API + 'add')
    .send({
      branch_name: 'Branch 1',
      branch_identifier: 'branch1',
      is_active: true,
      is_in_filter: true,
      show_on_dashboard: true,
    })
    .expect(201);
});

it('It should return 200 and all branches', async () => {
  const response = await request(app).get(API).send().expect(200);
  expect(response.body.branches.length).toEqual(1);
  expect(response.body.page).toEqual(1);
  expect(response.body.pages).toEqual(1);
  expect(response.body.total_branches).toEqual(1);
});
it('It should return 200 and all branches with pagination', async () => {
  await request(app)
    .get(API + '?pageNumber=2')
    .send()
    .expect(200);
  const response = await request(app)
    .get(API + '?pageNumber=2')
    .send()
    .expect(200);
  expect(response.body.branches.length).toEqual(0);
  expect(response.body.page).toEqual(2);
  expect(response.body.pages).toEqual(1);
  expect(response.body.total_branches).toEqual(1);
});
it('It should return 200 and all branches with pagination and search', async () => {
  await request(app)
    .get(API + '?pageNumber=1&search[branch_name]=B')
    .send()
    .expect(200);
  const response = await request(app)
    .get(API + '?pageNumber=1&search[branch_name]=B')
    .send()
    .expect(200);
  expect(response.body.branches.length).toEqual(1);
  expect(response.body.page).toEqual(1);
  expect(response.body.pages).toEqual(1);
  expect(response.body.total_branches).toEqual(1);
});
