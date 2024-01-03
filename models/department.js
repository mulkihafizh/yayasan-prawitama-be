const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minLength: 3,
      default: "Guru",
      enum: ["Guru", "Staff"],
    },
    details: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      default: 3500000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
