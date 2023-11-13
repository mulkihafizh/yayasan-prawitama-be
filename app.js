const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.DB_URL, {
    dbName: "yayasan-prawitama",
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const authRoutes = require("./routes/user");
const departmentRoutes = require("./routes/department");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/auth", authRoutes);
app.use("/department", departmentRoutes);
app.use("/employee", employeeRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
