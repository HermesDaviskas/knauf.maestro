import express from "express";
import cors from "cors";
import { json } from "body-parser";

import {
  currentUserRouter,
  signInRouter,
  signUpRouter,
  signOutRouter,
} from "./routes";

import { errorHandler } from "../../errorHandler";

const app = express();
app.use(cors());
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.use(errorHandler);

app.listen(3001, () => {
  console.log("knauf.maestro_auth micro-srv is running");
  console.log("Listening on port 3001");
});
