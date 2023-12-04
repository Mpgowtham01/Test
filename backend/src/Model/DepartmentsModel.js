import mongoose from "mongoose";

const { Schema, model } = mongoose;

const DepartmentnameSchema = new Schema(
  {
    departmentName: String,
  },
  { timestamps: true }
);

const DepartmentnameDb = model("departmentname", DepartmentnameSchema);

export default DepartmentnameDb;
