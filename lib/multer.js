import multer, { diskStorage } from "multer";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

const storage = diskStorage({
  destination: (req, file, cb) => {
    const username = req.body.name;
    if (!existsSync(`public/${username}/certificate`)) {
      mkdirSync(`public/${username}/certificate`, { recursive: true });
    }
    const destination = join("public", username, "certificate");

    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;

    cb(null, originalFilename);
  },
});

const upload = multer({ storage });

export default upload;
