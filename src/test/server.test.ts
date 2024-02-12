import request from 'supertest';
import { server } from '../..';
import { ErrorMessages } from '../constants';
import { User } from '../types';
import userController from '../controllers/userController';

const { NOT_ROUTE, NOT_USER, INVALID_ID, INVALID_BODY } = ErrorMessages;

const newUser = {
  username: 'Ilya',
  age: 24,
  hobbies: ['football'],
};

describe('API test', () => {
  afterEach(() => {
    server.close();
  });

  describe('GET request scenario', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(server).get('/api/users');
      expect(response.statusCode).toBe(200);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server).get('/api/users/ukrthgff');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 404 status code', async () => {
      const response = await request(server).get('/api/users/0238c0a1-87d6-4674-9ced-99e9146bc4b5');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('POST request scenario', () => {
    it('should respond with a 201 status code', async () => {
      const { username, age, hobbies } = newUser;
      const response = await request(server).post('/api/users').send({
        username: username,
        age: age,
        hobbies: hobbies,
      });
      expect(response.statusCode).toBe(201);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          age: 20,
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server).post('/api/users').send({
        username: 'Ilya',
        age: 20,
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          username: 'Ilya',
          hobbies: ['video'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });
  });

  describe('PUT request scenario', () => {
    it('should respond with a 200 status code', async () => {
      const postResponse = await request(server)
        .post('/api/users')
        .send({ ...newUser });
      const createdUser = postResponse.body;

      const putResponse = await request(server)
        .put(`/api/users/${createdUser.id}`)
        .send({
          ...newUser,
          age: 25,
        });
      expect(putResponse.statusCode).toBe(200);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server)
        .put('/api/users/ukrthgff')
        .send({
          username: 'Ilya',
          age: 20,
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 404 status code', async () => {
      const response = await request(server)
        .put('/api/users/5c4bdc51-61c7-47d2-bfe6-d176cdf84638')
        .send({
          username: 'Ilya',
          age: 100,
          hobbies: ['photo'],
        });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('DELETE request scenario', () => {
    it('should respond with a 204 status code', async () => {
      const postResponse = await request(server)
        .post('/api/users')
        .send({ ...newUser });
      const createdUser = postResponse.body;

      const response = await request(server).delete(`/api/users/${createdUser.id}`);
      expect(response.statusCode).toBe(204);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server).delete('/api/users/ukrthgff');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 404 status code', async () => {
      const response = await request(server).delete('/api/users/5c4bdc51-61c7-47d2-bfe6-d176cdf81111');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('Common scenario', () => {
    it('should respond with a 404 status code', async () => {
      const response = await request(server).get('/api/useefwewef');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_ROUTE);
    });
  });
});
