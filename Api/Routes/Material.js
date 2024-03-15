const express = require("express");
const router = express.Router();
const {
  getMaterials,
  getMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");

router.get("/", (req, res) => {
  getMaterials(req, res);
});

router.get("/:id", (req, res) => {
  getMaterial(req, res)
});

router.post("/", (req, res) => {
  createMaterial(req, res);
});

router.put("/:id", (req, res) => {
  updateMaterial(req, res);
});

router.delete("/:id", (req, res) => {
  deleteMaterial(req, res);
});

module.exports = router;
