import { Schema, model } from "mongoose";

const allowanceSchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
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

export default model("Allowance", allowanceSchema);
