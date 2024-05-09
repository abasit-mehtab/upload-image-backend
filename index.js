const express = require("express");

const cloudinary = require("./src/cloudinaryConfig");
const uploader = require("./src/multerConfig");

const app = express();

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Image Upload API!",
  });
});

app.post("/upload", uploader.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const upload = await cloudinary.v2.uploader.upload(req.file.path);

    return res.json({
      success: true,
      file: upload.secure_url,
    });
  } catch (error) {
    console.log("Error uploading file: ", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
