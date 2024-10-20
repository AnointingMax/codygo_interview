import multer from "multer";
import path from "path"
import fs from "fs"

const maxSize = 10 * 1024 * 1024

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = path.join(__dirname, '../../uploads/');

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString().concat("-", file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});

export default upload