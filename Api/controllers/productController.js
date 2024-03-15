const mongoose = require("mongoose");
const Product = require("../db/Schemas/Product");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");

const getProducts = async (req, res) => {
  try {
    const product = await getData(Product, {});
    res.status(200).json({
      status: 'success',
      message: 'The data has sucessfully fetched',
      data: product
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const getProduct = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const product = await getData(Product, { _id: req.params.id });
      res.status(200).json({
        status: 'success',
        message: 'The data has sucessfully fetched',
        data: product[0]
      });
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await addData(Product, req.body);
    res.status(201).json({
      status: "success",
      message: "New product added sucessfully",
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'erorr', message: e.message, cause: e.cause });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const updatedProduct = await updateData(Product, req.params.id, req.body);
      if (updatedProduct) {
        res.status(200).json({
          status: "sucess",
          message: 'The data is sucessfully updated',
          data: updatedProduct,
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

const deleteProduct = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const deletedProduct = await deleteData(Product, req.params.id);
      if (deletedProduct.deletedCount !== 0) {
        res
          .status(204)
          .json({ status: "sucess", message: 'The data record is successfully deleted', data: deletedProduct });
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
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
