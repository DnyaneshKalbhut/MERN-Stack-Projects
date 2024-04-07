const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const Contact = require("./contacts/contacts");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("DB connected");
});

app.post("/api/submit", (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });
  newContact.save();
  return res.json({ status: "pending" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
