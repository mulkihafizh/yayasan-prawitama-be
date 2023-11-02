const mongoose = require("mongoose");
const crypto = require("crypto");

const employeeSchema = new mongoose.Schema(
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
      required: true
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
        description: String,
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
    },
    encrypted_password: {
      type: String,
      required: true,
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
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
};
module.exports = mongoose.model("Employee", employeeSchema);
