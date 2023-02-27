const express = require("express");
const app = express();
const sharp = require("sharp");
const dotenv = require("dotenv");
dotenv.config();

const { createBanner } = require("./controllers/imageGeneration");
const multer = require("multer");
const upload = multer({storage : multer.memoryStorage()})
app.post("/banner",upload.single("image") ,createBanner);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
