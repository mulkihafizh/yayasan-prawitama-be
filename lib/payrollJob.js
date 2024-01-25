import Payroll from "../models/payroll.js";
import Employee from "../models/employee.js";
import Allowance from "../models/allowance.js";

export async function approvePayroll() {
  try {
    const data = await Payroll.find({
      status: "pending",
      month: new Date().getMonth(),
    });
    data.forEach(async (element) => {
      const employee = await findById(element.employee_id);
      const allowance = await Allowance.find({
        employee_id: element.employee_id,
      });

      element.salary = employee.department.salary * employee.attendance;
      element.allowances = allowance;
      element.status = "approved";
      await element.save();
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createPayroll() {
  try {
    const data = await Employee.find();
    data.forEach(async (element) => {
      const payroll = new Payroll({
        employee_id: element._id,
        status: "pending",
        month: new Date().getMonth(),
        name: element.name,
        salary: element.salary,
        allowances: element.allowances,
        insentive: element.insentive,
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
