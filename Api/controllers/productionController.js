const mongoose = require("mongoose");
const Production = require("../db/Schemas/Production");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");

const getProductions = async (req, res) => {
  try {
    const production = await getData(Production, {}, {path: 'Product'});
    res.status(200).json({
      status: 'success',
      message: 'The data has sucessfully fetched',
      data: production
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const getProduction = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const production = await getData(Production, { _id: req.params.id }, {path: 'Product'});
      res.status(200).json({
        status: 'success',
        message: 'The data has sucessfully fetched',
        data: production[0]
      });
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const createProduction = async (req, res) => {
  try {
    const production = await addData(Production, req.body);
    res.status(201).json({
      status: "success",
      message: "New product added sucessfully",
      data: production,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const updateProduction = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const updatedProduction = await updateData(Production, req.params.id, req.body, {path: 'Product'});
      if (updatedProduction) {
        res.status(200).json({
          status: "sucess",
          message: 'The data is sucessfully updated',
          data: updatedProduction,
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

const deleteProduction = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const deletedProduction = await deleteData(Production, req.params.id);
      if (deletedProduction.deletedCount !== 0) {
        res
          .status(204)
          .json({ status: "sucess", message: 'The data record is successfully deleted', data: deletedProduction });
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
  getProduction,
  getProductions,
  createProduction,
  updateProduction,
  deleteProduction,
};
