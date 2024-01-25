import { Schema, model } from "mongoose";

const cutiSchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    target_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name:{
      type: String,
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
      default: "Menunggu",
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

export default model("Cuti", cutiSchema);
