const sharp = require("sharp");

const createBanner = async (req, res) => {
  const width = parseInt(req.query.width) || 800;
  const height = parseInt(req.query.height) || 400;

  // Read the background image file and resize it to the desired dimensions
  const backgroundImage = await sharp(req.file.buffer)
    .resize(width, height)
    .toBuffer();

  const imageBuffer = await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  }).toBuffer();

  try {
    const data = await sharp(imageBuffer, {
      raw: {
        width: width,
        height: height,
        channels: 4,
        background: {
          r: 255,
          g: 255,
          b: 255,
          alpha: 1
        },
      },
    })
      .resize(width, height)
      .composite([
        {
          input: Buffer.from(
            `<svg><text x="50%" y="90%" dominant-baseline="middle" text-anchor="middle" font-size="48" font-family="Helvetica">${
              req.query.text || "Hi, How are you?"
            }</text></svg>`
          ),
          gravity: "center",
        },
        {
          input: backgroundImage,
          gravity: "center",
        },
      ])
      .png()
      .toBuffer();
    res.set("Content-Type", "image/png");
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

module.exports = { createBanner };
