const mongoose = require("mongoose");

const allowanceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minLength: 3,
    },
    base_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AllowanceType", allowanceTypeSchema);
