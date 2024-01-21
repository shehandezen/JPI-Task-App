const Summary = require("../db/Schemas/Summary");
const { getData, addData } = require("../db/dbFuncs");
const { processCsv } = require("../csv");

const saveSummary = async (req, res) => {
  try {
    const processedData = await processCsv(req.file.path);
    // console.log(processedData);
    const isExist = await getData(Summary, {
      Date: processedData.Date,
      Shift: processedData.Shift,
    });
    if (isExist.length == 0) {
      const storedData = await addData(Summary, processedData);
      console.log(storedData, "store");
      res.status(201).json({
        status: "success",
        message: "The data sheet is successfully saved.",
        data: storedData,
      });
    } else {
      res.status(409).json({
        status: "error",
        message: "The data sheet is already exist.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong.",
      cause: error.cause,
    });
  }
  //   console.log(isExist);
};

module.exports = { saveSummary };
