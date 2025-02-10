import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import { NotFoundError } from "./errors/NotFoundError";

import {
  currentUserRouter,
  signInRouter,
  signUpRouter,
  signOutRouter,
} from "./routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError({
    errorTriggers: [{ msg: "The requested resource was not found." }],
    inService: "auth",
    inFunction: "routing",
  });
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log("knauf.maestro_auth micro-srv is running");
  console.log("Listening on port 3001");
});
