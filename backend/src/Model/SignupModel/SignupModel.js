import mongoose from "mongoose";

const { Schema, model } = mongoose;

const signupSchema = new Schema(
  {
    role: String,
    name: String,
    email: String,
    phoneNumber: Number,
    password: String,
    location: String,
    departmentName: String,
  },
  { timestamps: true }
);

const SignUpDb = model("usersignup", signupSchema);

export default SignUpDb;
