import Payroll from "../models/payroll.js";
import Employee from "../models/employee.js";
import Allowance from "../models/allowance.js";
import allowanceTypes from "../models/allowanceTypes.js";

export async function approvePayroll() {
  try {
    const data = await Payroll.find({
      status: "pending",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });
    data.forEach(async (element) => {
      const employee = await Employee.findById(element.employee_id);
      const allowance = await Allowance.find({
        employee_id: element.employee_id,
      });

      element.salary = employee.department.salary * employee.attendance.total;
      element.allowances = [...element.allowances, ...allowance];
      element.status = "approved";
      await Allowance.deleteMany({ employee_id: element.employee_id });
      await element.save();
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createPayroll() {
  try {
    const bpjs = await allowanceTypes.findOne({ type: "BPJS Ketenagakerjaan" });
    const data = await Employee.find();
    data.forEach(async (element) => {
      console.log(element.name);

      const payroll = new Payroll({
        employee_id: element._id,
        status: "pending",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        name: element.name,
        salary: 0,
        allowances: [bpjs],
      });
      await payroll.save();
    });
  } catch (err) {
    console.log(err);
  }
}

export async function attendanceJob() {
  try {
    const data = await Employee.find();
    console.log(data);
    data.forEach(async (element) => {
      element.attendance.total = 0;
      await element.save();
    });
  } catch (err) {
    console.log(err);
  }
}
