const mongoose = require("mongoose");
const Report = require("../db/Schemas/Report");
const { getData, addData, updateData, deleteData } = require("../db/dbFuncs");

const getReports = async (req, res) => {
    try {
        const report = await getData(
            Report,
            req.query.filter == undefined ? {} : await JSON.parse(req.query.filter),
            { path: 'Report' },
            { path: 'Product' }
        );
        res.status(200).json({
            status: "success",
            message: "The data has sucessfully fetched",
            data: report,
        });
    } catch (e) {
        console.log(e.message);
        res
            .status(500)
            .json({ status: "erorr", message: e.message, cause: e.cause });
    }
};

const getReport = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const report = await getData(Report, { _id: req.params.id }, { path: 'Report' },{ path: 'Product' });
            res.status(200).json({
                status: "success",
                message: "The data has sucessfully fetched",
                data: report[0],
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

const createReport = async (req, res) => {
    try {
        const report = await addData(Report, req.body);
        res.status(201).json({
            status: "success",
            message: "New Report added sucessfully",
            data: report,
        });
    } catch (e) {
        console.log(e);
        res
            .status(500)
            .json({ status: "erorr", message: e.message, cause: e.cause });
    }
};

const updateReport = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const updatedReport = await updateData(Report, req.params.id, req.body, {path: 'Report'},{path: 'Product'});
            if (updatedReport) {
                res.status(200).json({
                    status: "sucess",
                    message: "The data is sucessfully updated",
                    data: updatedReport,
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

const deleteReport = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const deletedReport = await deleteData(Report, req.params.id);
            if (deletedReport.deletedCount !== 0) {
                res
                    .status(204)
                    .json({
                        status: "sucess",
                        message: "The data record is successfully deleted",
                        data: deletedReport,
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
    getReport,
    getReports,
    createReport,
    updateReport,
    deleteReport,
};
