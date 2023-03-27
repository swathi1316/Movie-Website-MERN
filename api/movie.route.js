import express from "express"
import searchMovie from '../imdb.js'
import UserController from "./user.controller.js";
const router = express.Router();



router.route("/").get((req, res) => {
    // Handle GET request to /users
    res.send('GET /users');
  })
  router.route("/search").get(UserController.authenticateToken, (req, res) => {
    const title = req.query.title; // extract the title from the query string
    searchMovie(title)
      .then(data => {
        const movie = data.results[0]
        const html =`
        <div style="display:flex; flex-direction:row;">
        <img src="${movie.image}" style="max-width:50%; height:auto;">
        <div style="flex-grow:1; padding:20px;">
          <h1>${movie.title} ${movie.description.split(',')[0]}</h1>
          <ul>
            <li><strong>Genres:</strong> ${movie.genres}</li>
            <li><strong>Cast:</strong> ${movie.starList.map(star => star.name).join(', ')}</li>
          </ul>
        </div>
      </div>
      `;
      res.send(html);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: "Unable to fetch data" });
      });
  });


// register endpoint
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

export default router;