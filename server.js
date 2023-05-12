import express from "express";
import cors from "cors";
import movies from "./api/movie.route.js";
import dbConnect, { mongoose } from "./dbConnect.js";
import path from "path";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", movies);

if (process.env.NODE_ENV === "production") {
  console.log("one going");
  app.use("/",express.static("client/build"));
}
else
{
  // Serve the index.html file for any unmatched routes
  app.get("*", (req, res) => {
    const indexHtmlPath = path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "../client/build/index.html"
    );
    res.sendFile(indexHtmlPath);
  });
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

export default app;













