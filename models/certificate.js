const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    minLength: 3,
  },
  issued_by: {
    type: String,
    required: true,
    maxlength: 32,
    minLength: 3,
  },
  date: {
    type: Date,
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);
