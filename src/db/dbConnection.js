const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => {
    console.log("Connected DB!!!");
  })
  .catch((e) => {
    console.log("DB connection error: ", e);
  });
