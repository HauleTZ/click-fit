const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Make sure the upload_images folder exists
const uploadFolder = path.join(__dirname, "upload_images");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Serve static files (if needed)
app.use(express.static(__dirname));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Upload endpoint
app.post("/upload_images", upload.single("image"), (req, res) => {
  res.status(200).json({ message: "Uploaded successfully",  filename: req.file.filename });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
