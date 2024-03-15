const mongoose = require("mongoose");
const Material = require("../db/Schemas/Material");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");

const getMaterials = async (req, res) => {
  try {
    const material = await getData(Material, {});
    res.status(200).json({
      status: 'success',
      message: 'The data has sucessfully fetched',
      data: material
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const getMaterial = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const material = await getData(Material, { _id: req.params.id });
      res.status(200).json({
        status: 'success',
        message: 'The data has sucessfully fetched',
        data: material[0]
      });
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const createMaterial = async (req, res) => {
  try {
    const material = await addData(Material, req.body);
    res.status(201).json({
      status: "success",
      message: "New Material added sucessfully",
      data: material,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const updateMaterial = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const updatedMaterial = await updateData(Material, req.params.id, req.body);
      if (updatedMaterial) {
        res.status(200).json({
          status: "sucess",
          message: 'The data is sucessfully updated',
          data: updatedMaterial,
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

const deleteMaterial = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const deletedMaterial = await deleteData(Material, req.params.id);
      if (deletedMaterial.deletedCount !== 0) {
        res
          .status(204)
          .json({ status: "sucess", message: 'The data record is successfully deleted', data: deletedMaterial });
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
  getMaterial,
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
