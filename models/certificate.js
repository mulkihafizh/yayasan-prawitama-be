import { Schema, model } from "mongoose";

const certificateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minLength: 3,
    },
    file: {
      type: String,
      required: true,
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
      type: Schema.Types.ObjectId,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Certificate", certificateSchema);
