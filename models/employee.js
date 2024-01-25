import { Schema, model } from "mongoose";
import { createHmac } from "crypto";

const employeeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 32,
      minLength: 3,
    },
    id_pegawai: {
      type: String,
      required: true,
      unique: true,
    },
    reg_number: {
      type: String,
      required: true,
      unique: true,
    },
    certi_number: {
      type: String,
      required: true,
      unique: true,
    },
    nik: {
      type: String,
      required: true,
      unique: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    birth_place: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    duty_start_date: {
      type: Date,
      required: true,
    },
    sk_number: {
      type: String,
      required: true,
    },
    graduation_date: {
      type: Date,
      required: true,
    },
    blood_type: {
      type: String,
      enum: ["A", "B", "AB", "O"],
      required: true,
    },
    department: {
      type: {
        name: String,
        details: String,
        salary: Number,
      },
      required: true,
    },
    employment_type: {
      type: String,
      enum: ["Permanent", "Contract"],
      required: true,
    },
    education_history: [
      {
        school_name: String,
        major: String,
        start_date: Date,
        end_date: Date,
      },
    ],
    work_history: [
      {
        company_name: String,
        position: String,
        start_date: Date,
        end_date: Date,
      },
    ],
    address: {
      type: {
        street: String,
        city: String,
        province: String,
        zip_code: String,
      },
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    is_married: {
      type: Boolean,
      required: true,
    },
    children: {
      type: Number,
      required: true,
      default: 0,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Laki-laki", "Perempuan"],
    },
    religion: {
      type: String,
      enum: ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"],
    },
    days_off: {
      type: Number,
      default: 3,
      required: true,
    },
    attendance: {
      type: {
        last: Date,
        total: Number,
      },
      default: {
        last: new Date(),
        total: 1,
      },
    },
    salt: String,
  },
  { timestamps: true }
);

employeeSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encrypted_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
};
export default model("Employee", employeeSchema);
