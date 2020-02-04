const student = require("./routes/student");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/studentapp")
  .then(() => console.log("Connected to mongoDB..."))
  .catch(err => console.log("Error in connecting MongoDB...", err));

app.use(express.json());
app.use("/api/student", student);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
