const mongoose = require("mongoose");
const ProductionReport = require("../db/Schemas/ProductionReport");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");

const getProductionReports = async (req, res) => {
  try {
    const productionReport = await getData(ProductionReport,  req.query.filter == undefined ? {} : await JSON.parse(req.query.filter));
    res.status(200).json({
      status: 'success',
      message: 'The data has sucessfully fetched',
      data: productionReport
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const getProductionReport = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const productionReport = await getData(ProductionReport, { _id: req.params.id }, {path: 'Product'});
      res.status(200).json({
        status: 'success',
        message: 'The data has sucessfully fetched',
        data: productionReport[0]
      });
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const createProductionReport = async (req, res) => {
  try {
    const productionReport = await addData(ProductionReport, req.body);
    res.status(201).json({
      status: "success",
      message: "New product added sucessfully",
      data: productionReport,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const updateProductionReport = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const updatedProductionReport = await updateData(ProductionReport, req.params.id, req.body, {path: 'Product'});
      if (updatedProductionReport) {
        res.status(200).json({
          status: "sucess",
          message: 'The data is sucessfully updated',
          data: updatedProductionReport,
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
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const deleteProductionReport = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const deletedProductionReport = await deleteData(ProductionReport, req.params.id);
      if (deletedProductionReport.deletedCount !== 0) {
        res
          .status(204)
          .json({ status: "sucess", message: 'The data record is successfully deleted', data: deletedProductionReport });
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
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

module.exports = {
  getProductionReport,
  getProductionReports,
  createProductionReport,
  updateProductionReport,
  deleteProductionReport,
};
