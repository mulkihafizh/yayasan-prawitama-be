import { connect } from "mongoose";
import express from "express";
const app = express();
import "dotenv/config";
import { CronJob } from "cron";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  approvePayroll,
  createPayroll,
  attendanceJob,
} from "./lib/payrollJob.js";
import { generateDepartment } from "./controllers/departmentController.js";

connect(process.env.DB_URL, {
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

const job = new CronJob("0 0 26 * *", async () => {
  await approvePayroll();
  await createPayroll();
  await attendanceJob();
});

job.start();

import authRoutes from "./routes/user.js";
import departmentRoutes from "./routes/department.js";
import employeeRoutes from "./routes/employee.js";
import certificateRoutes from "./routes/certificate.js";
import cutiRoutes from "./routes/cuti.js";

app.use("/auth", authRoutes);
app.use("/department", departmentRoutes);
app.use("/employee", employeeRoutes);
app.use("/certificate", certificateRoutes);
app.use("/cuti", cutiRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
