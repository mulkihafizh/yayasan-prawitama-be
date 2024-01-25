import { Schema, model } from "mongoose";
const { createHmac, randomBytes } = await import("node:crypto");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["employee_admin", "payroll_admin", "employee"],
      default: "employee",
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = randomBytes(16).toString("hex");
    this.encrypted_password = this.securePassword(password);
  })
  .get(function (password) {
    return this._password;
  });

userSchema.methods = {
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

export default model("User", userSchema);
