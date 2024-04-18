const mongoose = require("mongoose");
const Chart = require("../db/Schemas/Chart");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");

const getCharts = async (req, res) => {
  try {
    const chart = await getData(
      Chart,
      req.query.filter == undefined ? {} : await JSON.parse(req.query.filter)
    );
    res.status(200).json({
      status: "success",
      message: "The data has sucessfully fetched",
      data: chart,
    });
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ status: "erorr", message: e.message, cause: e.cause });
  }
};

const getChart = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const chart = await getData(Chart, { _id: req.params.id });
      res.status(200).json({
        status: "success",
        message: "The data has sucessfully fetched",
        data: chart[0],
      });
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ status: "erorr", message: e.message, cause: e.cause });
  }
};

const createChart = async (req, res) => {
  try {
    const chart = await addData(Chart, req.body);
    res.status(201).json({
      status: "success",
      message: "New Chart added sucessfully",
      data: chart,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: "erorr", message: e.message, cause: e.cause });
  }
};

const updateChart = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const updatedChart = await updateData(Chart, req.params.id, req.body);
      if (updatedChart) {
        res.status(200).json({
          status: "sucess",
          message: "The data is sucessfully updated",
          data: updatedChart,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "The data record does not exist on database.",
        });
      }
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ status: "erorr", message: e.message, cause: e.cause });
  }
};

const deleteChart = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const deletedChart = await deleteData(Chart, req.params.id);
      if (deletedChart.deletedCount !== 0) {
        res
          .status(204)
          .json({
            status: "sucess",
            message: "The data record is successfully deleted",
            data: deletedChart,
          });
      } else {
        res.status(400).json({
          status: "error",
          message: "The data record does not exist on database.",
        });
      }
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .json({ status: "erorr", message: e.message, cause: e.cause });
  }
};

module.exports = {
  getChart,
  getCharts,
  createChart,
  updateChart,
  deleteChart,
};
