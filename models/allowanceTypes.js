import { Schema, model } from "mongoose";

const allowanceTypesSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

export default model("AllowanceTypes", allowanceTypesSchema);
