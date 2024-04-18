const express = require("express");
const router = express.Router();
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

router.get("/", (req, res) => {
  getReports(req, res);
});

router.get("/:id", (req, res) => {
  getReport(req, res)
});

router.post("/", (req, res) => {
  createReport(req, res);
});

router.put("/:id", (req, res) => {
  updateReport(req, res);
});

router.delete("/:id", (req, res) => {
  deleteReport(req, res);
});

module.exports = router;
