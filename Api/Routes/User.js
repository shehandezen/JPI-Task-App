const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// setup destination path
const loc = path.dirname(__filename).split(path.sep);
loc.pop();
const dest = path.join(loc.join("/"), "public/profile");
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
var type = uploads.single("Image");

router.get("/", (req, res) => {
  getUsers(req, res);
});

router.get("/:id", (req, res) => {
  getUser(req, res);
});

router.post("/", uploads.array("files"), (req, res) => {
  createUser(req, res);
});

router.put("/:id", type, (req, res) => {
  updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
