const student = require("./routes/student");
const contacts = require("./routes/contacts");
const subjects = require("./routes/subjects");
const association = require("./routes/association");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/studentapp")
  .then(() => console.log("Connected to mongoDB..."))
  .catch(err => console.log("Error in connecting MongoDB...", err));

app.use(express.json());
app.use("/api", student);
app.use("/api/contacts", contacts);
app.use("/api/subjects", subjects);
app.use("/api/association", association);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
