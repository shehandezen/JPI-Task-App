const express = require("express");
const path = require("path");
const multer = require("multer");
const { saveSummary } = require("../controllers/summaryController");
const router = express.Router();
// setup destination path
const loc = path.dirname(__filename).split(path.sep);
loc.pop();
const dest = path.join(loc.join("/"), "csv");
console.log(dest);
// setup upload storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, dest);
  },
  filename: function (req, file, callback) {
    const time = new Date();
    console.log(time.getTime());
    callback(null, `${time.getTime()}-${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });
let type = uploads.single("file");

router.post("/upload-csv", type, (req, res) => {
  saveSummary(req, res);
});

module.exports = router;
