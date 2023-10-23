const mongoose = require("mongoose");

const allowanceSchema = new mongoose.Schema({
  allowance_types_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllowanceType",
    },
  ],
  amounts: [
    {
      type: Number,
      required: true,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Allowance", allowanceSchema);
