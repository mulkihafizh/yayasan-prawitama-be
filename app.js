const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const cron = require("cron");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { approvePayroll, createPayroll } = require("./lib/payrollJob");
const { generateDepartment } = require("./controllers/departmentController");

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

app.get("/", (req, res) => {
  generateDepartment(req, res);
});

const job = new cron.CronJob("0 0 25 * *", async () => {
  await approvePayroll();
  await createPayroll();
});

job.start();

const authRoutes = require("./routes/user");
const departmentRoutes = require("./routes/department");
const employeeRoutes = require("./routes/employeeRoutes");
const certificateRoutes = require("./routes/certificate");
const cutiRoutes = require("./routes/cuti");

app.use("/auth", authRoutes);
app.use("/department", departmentRoutes);
app.use("/employee", employeeRoutes);
app.use("/certificate", certificateRoutes);
app.use("/cuti", cutiRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
