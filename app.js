const express = require("express");
const app = express();
const sharp = require("sharp");
const dotenv = require("dotenv");
dotenv.config();

const { createBanner } = require("./controllers/imageGeneration");

app.post("/banner", createBanner);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running at http://localhost:8000");
});
