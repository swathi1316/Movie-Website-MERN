import request from 'supertest';
import { loginUser } from './loginUser.js';
import jwt_decode from 'jwt-decode';
import app from "../server.js";
import { mongoose } from '../dbConnect.js';

describe('Test API routes Ratings', () => {
  let token;
  let testRatingId;
  let server;

  beforeAll(async () => {
    try {
      const credentials = {
        email: 'chinnu123@gmail.com',
        password: '12345',
      };
      token = await loginUser(credentials);
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Disconnect from database
    app.close();
  });

  it('should add a new rating', async () => {
    if (!token) {
      console.log('Token not defined');
    }
    const decodedToken = jwt_decode(token);
    const testRating = {
      userId: decodedToken.userId,
      movieId: 87668,
      rating: 8
    };
    const res = await request(app)
      .post('/rating')
      .set('Authorization', `Bearer ${token}`)
      .send(testRating);
    expect(res.statusCode).toEqual(200); // Check for the correct status code
    expect(res.body.rating).toEqual(8);
    testRatingId = res.body._id;
  });

  it('should return a list of movies', async () => {
    const movieId = 87668;
    const res = await request(app).get(`/rating/${movieId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an existing rating', async () => {
    if (!token || !testRatingId) {
      fail('Token or testRatingId not defined');
    }
    const updatedRating = {
      rating: 6
    };
    const res = await request(app)
      .put(`/rating/${testRatingId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedRating);
    expect(res.statusCode).toEqual(200); // Check for the correct status code
    expect(res.body.rating).toEqual(6);
  });

  it('should delete an existing rating', async () => {
    if (token && testRatingId) {
      const res = await request(app)
        .delete(`/rating/${testRatingId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200); // Check for the correct status code
    }
  }, 10000);
});
