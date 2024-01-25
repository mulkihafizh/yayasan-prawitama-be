import { Schema, model } from "mongoose";

const childrenSchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minLength: 3,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Laki-laki", "Perempuan"],
    },
    birth_date: {
      type: Date,
      required: true,
    },
    birth_place: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Children", childrenSchema);
