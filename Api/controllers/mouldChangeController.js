const mongoose = require("mongoose");
const MouldChange = require("../db/Schemas/MouldChange");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");

const getMouldChanges = async (req, res) => {
  try {
    const mouldChange = await getData(MouldChange, {}, {path: 'PreviousProduct'}, {path: 'NextProduct'}, );
    res.status(200).json({
      status: 'success',
      message: 'The data has sucessfully fetched',
      data: mouldChange
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const getMouldChange = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const mouldChange = await getData(MouldChange, { _id: req.params.id }, {path: 'PreviousProduct'}, {path: 'NextProduct'});
      res.status(200).json({
        status: 'success',
        message: 'The data has sucessfully fetched',
        data: mouldChange[0]
      });
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const createMouldChange = async (req, res) => {
  try {
    const mouldChange = await addData(MouldChange, req.body);
    res.status(201).json({
      status: "success",
      message: "New product added sucessfully",
      data: mouldChange,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const updateMouldChange = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const updatedMouldChange = await updateData(MouldChange, req.params.id, req.body, {path: 'PreviousProduct'}, {path: 'NextProduct'});
      if (updatedMouldChange) {
        res.status(200).json({
          status: "sucess",
          message: 'The data is sucessfully updated',
          data: updatedMouldChange,
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

const deleteMouldChange = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const deletedMouldChange = await deleteData(MouldChange, req.params.id);
      if (deletedMouldChange.deletedCount !== 0) {
        res
          .status(204)
          .json({ status: "sucess", message: 'The data record is successfully deleted', data: deletedMouldChange });
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
  getMouldChange,
  getMouldChanges,
  createMouldChange,
  updateMouldChange,
  deleteMouldChange,
};
