const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.body.name;
    if (!fs.existsSync(`public/${username}/certificate`)) {
      fs.mkdirSync(`public/${username}/certificate`, { recursive: true });
    }
    const destination = path.join("public", username, "certificate");

    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;

    cb(null, originalFilename);
  },
});

const upload = multer({ storage });

module.exports = upload;
