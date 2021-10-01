import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import { connect } from '@shared/infra/typeorm';

import { makeUser } from '../factories/UserFactory';

let connection: Connection;

describe('UsersController', () => {
  beforeAll(async () => {
    connection = await connect();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.dropDatabase();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  describe('List', () => {
    it('should be able to list users empty', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
    });

    it('should be able to list existing users', async () => {
      await request(app)
        .post('/users')
        .send(makeUser({ username: 'john1', email: 'john.doe1@example.com' }));

      await request(app)
        .post('/users')
        .send(makeUser({ username: 'john2', email: 'john.doe2@example.com' }));

      const response = await request(app).get('/users');

      expect(response.body.length).toBe(2);
    });
  });

  describe('Create', () => {
    it('should be able to create a new user', async () => {
      const response = await request(app).post('/users').send(makeUser());

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async () => {
      await request(app)
        .post('/users')
        .send(makeUser({ username: 'john1', email: 'john.doe1@example.com' }));

      const response = await request(app)
        .post('/users')
        .send(makeUser({ username: 'john2', email: 'john.doe1@example.com' }));

      expect(response.status).toBe(406);
    });
  });

  describe('Show', () => {
    it('should be able to show existing user', async () => {
      const { body: created } = await request(app)
        .post('/users')
        .send(makeUser({ username: 'john1', email: 'john.doe1@example.com' }));

      const response = await request(app).get(`/users/${created.id}`);

      expect(response.body).toEqual(created);
    });

    it('should not be able to show non existing user', async () => {
      const response = await request(app).get(`/users/non-existing-user`);

      expect(response.status).toBe(404);
    });
  });

  describe('Update', () => {
    it('should be able to update existing user', async () => {
      const { body: created } = await request(app)
        .post('/users')
        .send(makeUser({ name: 'Created Name' }));

      const { body: updated } = await request(app)
        .put(`/users/${created.id}`)
        .send(makeUser({ name: 'Updated Name' }));

      expect(created.name).toBe('Created Name');
      expect(updated.name).toBe('Updated Name');
    });

    it('should not be able to update a non existing user', async () => {
      const response = await request(app)
        .put(`/users/non-existing-user`)
        .send(makeUser({ name: 'Updated Name' }));

      expect(response.status).toBe(404);
    });
  });

  describe('Delete', () => {
    it('should be able to delete existing user', async () => {
      const { body: created } = await request(app)
        .post('/users')
        .send(makeUser({ name: 'Created Name' }));

      const response = await request(app).delete(`/users/${created.id}`);

      expect(response.status).toBe(204);
    });

    it('should not be able to delete a non existing user', async () => {
      const response = await request(app).delete(`/users/non-existing-user`);

      expect(response.status).toBe(404);
    });
  });
});
