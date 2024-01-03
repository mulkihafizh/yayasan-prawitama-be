const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      required: true,
    },
    month: {
      type: Number,
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
    allowances: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [{ name: "BPJS", amount: 1000000 }],
    },
    insentive: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);
