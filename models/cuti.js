const mongoose = require("mongoose");

const cutiSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    target_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Cuti", "Izin", "Sakit"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Menunggu", "Diterima", "Ditolak", "Disetujui Admin"],
    },
    department: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cuti", cutiSchema);
