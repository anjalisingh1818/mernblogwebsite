const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongodb = require("mongodb");
const path = require("path");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "../Frontend/build")));
const PORT = process.env.PORT || 8000;

const userRoutes = require("./Routes/Login");
const blogRoutes = require("./Routes/Blog");

const mongoose = require("mongoose");
async function connecting() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully Connected");
    })
    .catch((err) => {
      console.log("Error while connecting" + err);
    });
}
connecting();

app.use(express.json());
app.use("/", userRoutes);
app.use("/blog", blogRoutes);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./Frontend/build/index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running on port: `, PORT);
});
