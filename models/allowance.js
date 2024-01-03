const mongoose = require("mongoose");

const allowanceSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Allowance", allowanceSchema);
