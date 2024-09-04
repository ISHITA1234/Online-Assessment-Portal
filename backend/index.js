// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");

const app = express();

//to support the JSON body in post requests, add the express body parser middleware
app.use(express.json())

//CORS:Since our frontend and backend will be hosted on separate routes, add the cors middleware
const cors = require("cors");
app.use(cors());

//route all requests from /api/v1 to it******
app.use("/api/v1", rootRouter);

app.listen(3000);
