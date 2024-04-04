const express = require("express");
require("dotenv").config();
require("./src/db/dbConnection");
require("express-async-errors");
const errorHandlerMiddleWare = require("./src/middlewares/errorHandler");
const { Server } = require("socket.io");

const bodyParser = require("body-parser");
const router = require("./src/routers");
const app = express();
const port = process.env.PORT || 5001;
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: "It's working!!!!",
  });
});
app.use(errorHandlerMiddleWare);

const io = new Server({});

io.on("connection", (socket) => {
  console.log("new user connected");
});

app.listen(port, () => {
  console.log("Server using port: " + port + " ...");
});
