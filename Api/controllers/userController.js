const mongoose = require("mongoose");
const User = require("../db/Schemas/User");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");
const {
  passwordHash,
  comparePasswords,
  generateToken,
} = require("../auth/auth");

const getUsers = async (req, res) => {
  try {
    const users = await getData(user, {});
    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: e.message, cause: e.cause });
  }
};

const getUser = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const user = await getData(User, { _id: req.params.id });
      res.status(200).json({ status: "success", data: user[0] });
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: "error", cause: e.cause });
  }
};

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const existUser = await getData(User, { Email: req.body.Email });
    if (existUser.length > 0) {
      res
        .status(409)
        .json({ status: "error", message: "Email is already exist!" });
    } else {
      req.body.Password = await passwordHash(req.body.Password);
      console.log(req.body);
      const user = await addData(User, req.body);
      res.status(201).json({
        status: "success",
        message: "You signed up successfully!",
        data: user,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: e.message, cause: e.cause });
  }
};

const updateUser = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const preData = await getData(User, { _id: req.params.id });
      console.log(preData, "predata");
      if (await comparePasswords(req.body.Password, preData[0].Password)) {
        console.log("authorized");
        delete req.body.Password;
        req.body.Image = req.file?.filename;
        const updatedUser = await updateData(User, req.params.id, req.body);
        if (updatedUser) {
          const payload = await {
            UserName: updatedUser.UserName,
            FirstName: updatedUser.FirstName,
            LastName: updatedUser.LastName,
            Role: updatedUser.Role,
            Image: updatedUser.Image,
            Email: updatedUser.Email,
            _id: updatedUser._id,
          };
          console.log(payload, "payload");
          const accessToken = await generateToken(payload);

          res.status(200).json({
            status: "success",
            message: "data is successfully updated on database",
            data: updatedUser,
            token: accessToken,
          });
        } else {
          res.status(400).json({
            status: "error",
            message: "The data record does not exist on database.",
          });
        }
      } else {
        res
          .status(400)
          .json({ status: "error", message: "Incorrect password!" });
      }
    } else {
      res.status(400).json({ status: "error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: "error", message: e.cause });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const deletedUser = await deleteData(User, req.params.id);
      if (deletedUser.deletedCount !== 0) {
        res.status(204).json({ status: "deleted", deletedData: deletedUser });
      } else {
        res.status(400).json({
          status: "Error",
          message: "The data record does not exist on database.",
        });
      }
    } else {
      res.status(400).json({ status: "Error", message: "Provide a valid key" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: e.message, cause: e.cause });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
