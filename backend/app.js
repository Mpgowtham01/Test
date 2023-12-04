import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
  json({
    limit: "25MB",
  })
);

import signup from "./src/Routes/SignupRouter.js";
import department from "./src/Routes/managerRouter.js";

app.use("/signup", signup);
app.use("/department", department);

export default app;
