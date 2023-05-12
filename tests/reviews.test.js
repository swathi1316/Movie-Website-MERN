import request from 'supertest';
import { loginUser } from './loginUser.js';
import jwt_decode from 'jwt-decode';
import app from "../server.js";
import dbConnect from '../dbConnect.js';
import { mongoose } from '../dbConnect.js';

describe('Test API routes', () => {
  let token;
  let testReviewId;
  let server;

  beforeEach(async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  });


  beforeAll(async () => {
    const credentials = {
      email: 'chinnu123@gmail.com',
      password: '12345',
    };
    token = await loginUser(credentials);
  }, 10000);

  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect from database
  },10000);

  it('should add a new review', async () => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const testReview = {
        userId: decodedToken.userId,
        movieId: 87666,
        reviewText: 'good movie'
      };
      const res = await request(app)
        .post('/review')
        .set('Authorization', `Bearer ${token}`)
        .send(testReview);
      expect(res.statusCode).toEqual(200); // Check for the correct status code
      expect(res.body.reviewText).toEqual('good movie');
      testReviewId = res.body._id;
    }
  }, 10000);

  it('should return a list of movies', async () => {
    const movieId = 87666;
    const res = await request(app).get(`/review/${movieId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  }, 10000);

 

  it('should update an existing review', async () => {
    if (token && testReviewId) {
      const updatedReview = {
        reviewText: 'great movie'
      };
      const res = await request(app)
        .put(`/review/${testReviewId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedReview);
      expect(res.statusCode).toEqual(200); // Check for the correct status code
      expect(res.body.reviewText).toEqual('great movie');
    }
  }, 10000);

  it('should delete an existing review', async () => {
    if (token && testReviewId) {
      const res = await request(app)
        .delete(`/review/${testReviewId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200); // Check for the correct status code
    }
  }, 10000);
});







// describe('Dummy test', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// });

