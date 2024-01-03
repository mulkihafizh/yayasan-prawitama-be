const Payroll = require("../models/payroll");
const Employee = require("../models/employee");
const Allowance = require("../models/allowance");

exports.approvePayroll = async () => {
  try {
    const data = await Payroll.find({
      status: "pending",
      month: new Date().getMonth(),
    });
    data.forEach(async (element) => {
      const employee = await Employee.findById(element.employee_id);
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
};

exports.createPayroll = async () => {
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
};
