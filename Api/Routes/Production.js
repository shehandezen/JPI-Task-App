const express = require("express");
const router = express.Router();
const {
  getProductions,
  getProduction,
  createProduction,
  updateProduction,
  deleteProduction,
} = require("../controllers/productionController");

router.get("/", (req, res) => {
  getProductions(req, res);
});

router.get("/:id", (req, res) => {
  getProduction(req, res)
});

router.post("/", (req, res) => {
  createProduction(req, res);
});

router.put("/:id", (req, res) => {
  updateProduction(req, res);
});

router.delete("/:id", (req, res) => {
  deleteProduction(req, res);
});

module.exports = router;
