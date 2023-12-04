import app from "./app.js";
import mongoose from "mongoose";
import { config } from "dotenv";
// connect is used to connect DB
const { connect } = mongoose;

config({
  path: "./.env",
});

const database = process.env.DATABASE;
const port = process.env.PORT;

connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then((res) => {
  console.log("DB Connected");
});

app.listen(port, () => {
  console.log("Connected");
});
