const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
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
  birth_date: {
    type: Date,
    required: true,
  },
  birth_place: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Children", childrenSchema);