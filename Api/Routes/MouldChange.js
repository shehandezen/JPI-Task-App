const express = require("express");
const router = express.Router();
const {
  getMouldChanges,
  getMouldChange,
  createMouldChange,
  updateMouldChange,
  deleteMouldChange,
} = require("../controllers/mouldChangeController");

router.get("/", (req, res) => {
    getMouldChanges(req, res);
});

router.get("/:id", (req, res) => {
    getMouldChange(req, res)
});

router.post("/", (req, res) => {
    createMouldChange(req, res);
});

router.put("/:id", (req, res) => {
    updateMouldChange(req, res);
});

router.delete("/:id", (req, res) => {
    deleteMouldChange(req, res);
});

module.exports = router;
