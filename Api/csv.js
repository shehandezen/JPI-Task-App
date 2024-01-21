const xlsx = require("xlsx");

const MCNO = [
  "IM-01",
  "IM-02",
  "IM-03",
  "IM-04",
  "IM-05",
  "IM-06",
  "IM-07",
  "IM-08",
  "IM-09",
  "IM-10",
  "IM-11",
  "IM-12",
  "IM-13",
  "IM-14",
  "IM-15",
  "IM-16",
  "IM-17",
  "IM-18",
  "IM-19",
  "IM-20",
  "IM-21",
  "IM-22",
  "IM-23",
  "IM-24",
  "IML-01",
  "IML-02",
  "IML-03",
  "IML-04",
  "IML-05",
  "IML-06",
  "BM-1",
  "BM-2",
  "BM-3",
  "BM-4",
  "BM-5",
  "BM-6",
  "BM-7",
  "BM-8",
  "BM-9",
  "BM-10",
  "IBM-01",
  "Kombis",
  "T-01",
  "T-02",
  "F01",
  "F02",
  "L01",
];

const processCsv = (filePath) => {
  const worksheet = xlsx.readFile(filePath).Sheets.Sheet1;
  // console.log(worksheet);
  const data = [];
  let pointer = 0;
  let row = {};
  for (const [key, value] of Object.entries(worksheet)) {
    if (key[0] === "C") {
      if (MCNO.includes(value.v)) {
        pointer = key.slice(1);
        row = { MachineNo: value.v };
      }
    }
    if (key.slice(1) == pointer) {
      if (key[0] === "D") {
        row = { ...row, ProductName: value.v };
      }
      if (key[0] === "E") {
        row = { ...row, CycleTime: value.v };
      }
      if (key[0] === "F") {
        row = { ...row, HourlyTarget: value.v };
      }
      if (key[0] === "G") {
        row = { ...row, PlannedQty: value.v };
      }
      if (key[0] === "H") {
        row = { ...row, AcceptedQty: value.v };
      }
      if (key[0] === "I") {
        row = { ...row, DownTime: value.v };
      }
      if (key[0] === "J") {
        row = { ...row, MaterialDamages: value.v };
      }
      if (key[0] === "K") {
        row = { ...row, MachineDamages: value.v };
      }
      if (key[0] === "L") {
        row = { ...row, OtherDamages: value.v };
      }
      if (key[0] === "O") {
        row = { ...row, Operator: value.v.trim() };
      }
      if (key[0] === "S") {
        row = { ...row, Weight: value.v };
      }
      if (key[0] === "T") {
        row = { ...row, NoOfCavitiesStandard: value.v };
      }
      if (key[0] === "U") {
        row = { ...row, NoOfCavitiesUsed: value.v };
        data.push(row);
      }
    }
  }
  return {
    Date: worksheet.I1.v,
    Shift: worksheet.E1.v,
    Supervisor: worksheet.N1.v.slice(12).trim(),
    Data: data,
  };
};

module.exports = { processCsv };
