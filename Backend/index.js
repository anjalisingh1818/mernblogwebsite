const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongodb=require('mongodb')

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const PORT = process.env.PORT || 8000;

const userRoutes = require("./Routes/Login");
const blogRoutes = require("./Routes/Blog");

const mongoose = require("mongoose");
async function connecting(){
  await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch((err) => {
    console.log("Error while connecting" + err);
  });
}
connecting()

app.use(express.json());
app.use("/", userRoutes);
app.use("/blog", blogRoutes);
app.get("*", (req, res) => {
  res.status(404).send({ error: "Something went wrong" });
});
app.listen(PORT, () => {
  console.log(`Server running on port: `, PORT);
});
