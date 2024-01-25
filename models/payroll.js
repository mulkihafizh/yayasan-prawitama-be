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
    allowances: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
      default: [{ name: "BPJS", amount: 1000000 }],
    },
    insentive: [
      {
        name: {
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
  { timestamps: true }
);

export default model("Payroll", payrollSchema);
