import express from "express";
import cors from "cors";
import movies from "./api/movie.route.js";
import dbConnect ,{mongoose} from './dbConnect.js';
import path from "path";

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const prod = process.env.NODE_ENV
console.log("prod",prod);
if (process.env.NODE_ENV === "production") {
  console.log("going in");
  app.use("/", express.static("client/build"));
}
else
{
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
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









