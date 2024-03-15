const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./Routes/Product");
const Summary = require("./Routes/Summary");
const MouldChange = require("./Routes/MouldChange")
const Production = require("./Routes/Production")
const Material = require("./Routes/Material")
const authRoute = require("./Routes/auth");
const User = require("./Routes/User");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// connect to the database
mongoose.connect(process.env.MONGOURI);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("./public"));

//root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", path: "root" });
});

//routes
app.use("/product", Product);
app.use("/production", Production);
app.use("/material", Material);
app.use("/mouldchange", MouldChange);
app.use("/summary", Summary);
app.use("/auth", authRoute);
app.use("/user", User);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
