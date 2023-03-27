
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






// .then(async client => {
//     // await RestaurantsDAO.injectDB(client)
//     // await ReviewsDAO.injectDB(client)
//     app.listen(port,() => {
//         console.log(`listening on port ${port}`)
//     })
// })


// const { app } = require('./server');

// // ... your database connection and other code ...

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// app.get('/',(req,res) => {
//     res.send('<h1>Hello<h1');
// });
// app.listen(8000,() => {
//     console.log("the port is  running");
// });


