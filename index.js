// Requires
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const card = require("./routes/card");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/card", card);

mongoose
  .connect(process.env.dbConnection, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected successfuly"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server Started on port", PORT));
