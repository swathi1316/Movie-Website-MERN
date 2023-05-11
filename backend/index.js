import app from "./server.js";
import dbConnect from './dbConnect.js';
import {mongoose} from './dbConnect.js';
const port = process.env.PORT || 8000;
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
  export { app, mongoose, port };








