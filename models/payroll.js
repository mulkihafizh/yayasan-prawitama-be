const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minLength: 3,
    },
    salary: {
      type: Number,
      required: true,
    },
    allowance_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    insentive: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);
