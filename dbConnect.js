import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  // {mongoose object is being created}
  // 1.execute index.js file
  /*
  2.dconnect will be executed 
  3.connecting to the db_url
  4.making all features
  5.if connection is successful , then callback function is to either display connected or unable to connect
  6.after there is app imported from server.js
  7.it uses express.js and cors and the route is imported from api folder and set the start route tag after localhost:8000/ is set and once
        app gets started , the page content with "/" will be displayed.
  */
  mongoose
    .connect(
        process.env.MOV_DB_URL,
      {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize:50,
        wtimeoutMS:2500,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

export default dbConnect;
export { mongoose };