const express = require("express");
const router = express.Router();
const {
  getProductionReports,
  getProductionReport,
  createProductionReport,
  updateProductionReport,
  deleteProductionReport,
} = require("../controllers/productionReportController");

router.get("/", (req, res) => {
  getProductionReports(req, res);
});

router.get("/:id", (req, res) => {
  getProductionReport(req, res)
});

router.post("/", (req, res) => {
  createProductionReport(req, res);
});

router.put("/:id", (req, res) => {
  updateProductionReport(req, res);
});

router.delete("/:id", (req, res) => {
  deleteProductionReport(req, res);
});

module.exports = router;
