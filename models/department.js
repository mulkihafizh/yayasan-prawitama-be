import { Schema, model } from "mongoose";

const departmentSchema = new Schema(
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
      default: 150000,
    },
  },
  { timestamps: true }
);

export default model("Department", departmentSchema);
