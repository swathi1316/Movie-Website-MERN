import express from "express";
import searchMovie from '../api_calls/movieDetails.js';
import UserController from "./user.controller.js";
import recentMovie from "../api_calls/recentMovie.js";
import popularMovie from "../api_calls/popular.js";
import appMiddleware from '../auth.js';
import app from "../server.js";
import reviewController from "./reviews.controller.js";
const router = express.Router();





router.route("/").get((req, res) => {
    // Handle GET request to /users
    recentMovie()
      .then(data => {
        const movie = data.results;
        console.log("movie:",movie);
        res.send(movie);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: "Unable to fetch data" });
      });

  });
  router.route("/popular")
  .get(UserController.authenticateToken, (req, res) => {
    const currentUser = req.user.userId;
    console.log("user logged in", currentUser);
    popularMovie()
      .then(data => {
        const popularMovie = data;
        res.send(popularMovie);
      })
      .catch(error => {
        console.error('LogIn to request the data:', error);
        res.status(500).json({ error:"Login to request the data" });
      });
  });
  router.route("/search").get((req, res) => {
    const title = req.query.title;
    console.log("title_backend,",title);
    console.log("title:",title) // extract the title from the query string
    searchMovie(title)
      .then(data => {
        const movie = data;
      res.send(movie);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: "Unable to fetch data" });
      });
  });
  router.post("/register", UserController.registerUser);
  router.post("/login", UserController.loginUser);
  router.post("/review", UserController.authenticateToken,reviewController.createReview);
  router.get("/review/:movieId", reviewController.getReviews);
  router.put("/review/:id", UserController.authenticateToken,reviewController.updateReviews);
  router.delete("/review/:id", UserController.authenticateToken,reviewController.deleteReview);



export default router;
  // router.route("/search").get(UserController.authenticateToken, (req, res) => {
  //   const title = req.query.title;
  //   console.log("title:",title) // extract the title from the query string
  //   searchMovie(title)
  //     .then(data => {
  //       const movie = data;
  //       console.log("movie:",movie);
  //       const html =`
  //       <div style="display:flex; flex-direction:row;">
  //       <img src="${movie.poster_path}" style="max-width:50%; height:auto;">
  //       <div style="flex-grow:1; padding:20px;">
  //         <h1>${movie.original_title} ${movie.overview}</h1>
  //         <ul>
  //           <li><strong>Languages:</strong> ${movie.original_language}</li>
  //           <li><strong>Genres:</strong> ${movie.genres[0].name}</li>
  //         </ul>
  //       </div>
  //     </div>
  //     `;
  //     res.send(html);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       res.status(500).json({ error: "Unable to fetch data" });
  //     });
  // });


// register endpoint


 //   console.log("movie:",movie);
      //   const html =`
      //   <div style="display:flex; flex-direction:row;">
      //   <img src="${movie.poster_path}" style="max-width:50%; height:auto;">
      //   <div style="flex-grow:1; padding:20px;">
      //     <h1>${movie.original_title} ${movie.overview}</h1>
      //     <ul>
      //       <li><strong>Languages:</strong> ${movie.original_language}</li>
      //       <li><strong>Genres:</strong> ${movie.genres[0].name}</li>
      //     </ul>
      //   </div>
      // </div>
      // `;


 //   const html =`
      //   <div style="display:flex; flex-direction:row;">
      //   <img src="${movie.poster_path}" style="max-width:50%; height:auto;">
      //   <div style="flex-grow:1; padding:20px;">
      //     <h1>${movie.original_title} ${movie.overview}</h1>
      //     <ul>
      //       <li><strong>Languages:</strong> ${movie.original_language}</li>
      //       <li><strong>Genres:</strong> ${movie.genres[0].name}</li>
      //     </ul>
      //   </div>
      // </div>
      // `;