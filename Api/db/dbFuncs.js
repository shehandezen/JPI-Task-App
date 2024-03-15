const mongoose = require("mongoose");

const getData = async (Schema, searchObj, ref1 = false, ref2 = false) => {
  try {
    if (ref1 && ref2) {
      const data = await Schema.find(searchObj).populate(ref1).populate(ref2);
      console.log(data);
      return data;
    } else if (!ref2) {
      const data = await Schema.find(searchObj).populate(ref1);
      console.log(data);
      return data;
    } else {
      const data = await Schema.find(searchObj);
      console.log(data);
      return data;
    }
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

const updateData = async (Schema, id, dataObj, ref1 = false, ref2 = false) => {
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      if (ref1 && ref2) {
        const updatedData = await Schema.findByIdAndUpdate(
          id,
          { $set: dataObj },
          { new: true },
        ).populate(ref1).populate(ref2);
        return updatedData;
      } else if (!ref2) {
        const updatedData = await Schema.findByIdAndUpdate(
          id,
          { $set: dataObj },
          { new: true },
        ).populate(ref1);
        return updatedData;
      } else {
        const updatedData = await Schema.findByIdAndUpdate(
          id,
          { $set: dataObj },
          { new: true },
        );
        return updatedData;
      }
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
