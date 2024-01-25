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
import AllowanceTypes from "./models/allowanceTypes.js";

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

app.get("/", async (req, res) => {
  // const allowance = [
  //   {
  //     type: "BPJS Ketenagakerjaan",
  //     amount: 5,
  //   },
  //   {
  //     type: "Lembur/Cuti",
  //     amount: 1,
  //   },
  //   {
  //     type: "Tunjangan Wali Kelas",
  //     amount: 1200000,
  //   },
  //   {
  //     type: "Tunjangan Pasangan",
  //     amount: 1000000,
  //   },
  //   {
  //     type: "Tunjangan Anak",
  //     amount: 1000000,
  //   },
  // ];
  // for (let i = 0; i < allowance.length; i++) {
  //   const allowanceType = new AllowanceTypes({
  //     type: allowance[i].type,
  //     amount: allowance[i].amount,
  //   });
  //   await allowanceType.save();
  // }
  // res.json({ message: "Hello World" });
});

const job = new CronJob("0 0 26 * *", async () => {
  await createPayroll();
  await approvePayroll();
  await attendanceJob();
});

job.start();

import authRoutes from "./routes/user.js";
import departmentRoutes from "./routes/department.js";
import employeeRoutes from "./routes/employee.js";
import certificateRoutes from "./routes/certificate.js";
import cutiRoutes from "./routes/cuti.js";
import payrollRoutes from "./routes/payroll.js";

app.use("/auth", authRoutes);
app.use("/department", departmentRoutes);
app.use("/employee", employeeRoutes);
app.use("/certificate", certificateRoutes);
app.use("/cuti", cutiRoutes);
app.use("/payroll", payrollRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
