const mongoose = require("mongoose");

const getData = async (Schema, searchObj) => {
  try {
    const data = await Schema.find(searchObj);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Database Error", { cause: e.message });
  }
};

const addData = async (Schema, dataObj) => {
  try {
    const data = new Schema(dataObj);
    await data.save();
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error("Database Error", { cause: e.message });
  }
};

const updateData = async (Schema, id, dataObj) => {
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const updatedData = await Schema.findByIdAndUpdate(
        id,
        { $set: dataObj },
        { new: true },
      );
      return updatedData;
    } else {
      return { status: "erorr", message: "Provide a valid key" };
    }
  } catch (e) {
    console.log(e.message);
    throw new Error("Database Error", { cause: e.message });
  }
};

const deleteData = async (Schema, id) => {
  try {
    const deletedData = await Schema.deleteOne({ _id: id });
    return deletedData;
  } catch (e) {
    console.log(e.message);
    throw new Error("Database Error", { cause: e.message });
  }
};

module.exports = { getData, addData, updateData, deleteData };
