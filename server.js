import express from "express"
import cors from "cors"
import movies from "./api/movie.route.js"


const app = express()


app.use(cors())
app.use(express.json())



app.use('/', movies);


// app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "Unable to connect"}))

export default app




// const express = require('express');
// const app = express();

// app.use(cors())
// app.use(express.json())

// app.use("*", (req, res) => res.status(404).json({ error: "Unable to connect"}))

// module.exports = app


// import app from "./server.js"
// app.listen(port,() => {
//     console.log(`listening on port ${port}`)
// })