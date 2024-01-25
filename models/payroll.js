import { Schema, model } from "mongoose";

const payrollSchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      required: true,
      default: "pending",
    },
    month: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minLength: 3,
    },
    salary: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    allowances: {
      type: [
        {
          type: {
            type: String,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default model("Payroll", payrollSchema);
