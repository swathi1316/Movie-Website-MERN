import express from "express";
import cors from "cors";
import movies from "./api/movie.route.js";
import dbConnect from './dbConnect.js';
import {mongoose} from './dbConnect.js';

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", movies);

app.use("*", (req, res) =>
  res.status(404).json({ error: "Unable to connect" })
);

if(process.env.NODE_ENV === 'production')
{
  app.use(express.static('./client/build'))
}

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });



export {app};








