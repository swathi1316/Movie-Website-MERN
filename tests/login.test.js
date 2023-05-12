// import app from "../server.js";
// import dbConnect from '../dbConnect.js';
// import { mongoose } from '../dbConnect.js';
// import request from 'supertest';

// describe('Login endpoint', () => {

//   let server;

//   beforeEach(async () => {
//     try {
//       await dbConnect();
//       server = app.listen(8000);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   afterEach(() => {
//     mongoose.connection.close();
//     server.close();
//   });

//   it('should return a token for valid credentials', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({
//         email: 'shanky123@gmail.com',
//         password: '12345'
//       })
//       .expect(200);

//     expect(response.body.token).toBeDefined();
//   },10000);

//   it('should return an error for invalid credentials', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({
//         email: 'shanky123@gmail.com',
//         password: '6778'
//       })
//       .expect(400);

//     // expect(response.body.message).toEqual('Passwords do not match');
//   },10000);

//   it('should return an error for non-existent user', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({
//         email: 'duke123@gmail.com',
//         password: '12345'
//       })
//       .expect(404);

//     // expect(response.body.message).toEqual('Email not found');
//   },10000);
// });



