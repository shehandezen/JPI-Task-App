const express = require("express");
const router = express.Router();
const {
  getCharts,
  getChart,
  createChart,
  updateChart,
  deleteChart,
} = require("../controllers/chartController");

router.get("/", (req, res) => {
  getCharts(req, res);
});

router.get("/:id", (req, res) => {
  getChart(req, res)
});

router.post("/", (req, res) => {
  createChart(req, res);
});

router.put("/:id", (req, res) => {
  updateChart(req, res);
});

router.delete("/:id", (req, res) => {
  deleteChart(req, res);
});

module.exports = router;
