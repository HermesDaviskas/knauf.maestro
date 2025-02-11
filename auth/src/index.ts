import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import {
  currentUserRouter,
  signInRouter,
  signUpRouter,
  signOutRouter,
} from "./routes";

import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError(`The url ${req.url} was not found.`);
});

app.use(errorHandler);

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-clusterip-srv:3011/auth");
    console.log("connected to auth db");
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

app.listen(3001, () => {
  console.log("knauf.maestro_auth micro-srv is running");
  console.log("Listening on port 3001");
});
