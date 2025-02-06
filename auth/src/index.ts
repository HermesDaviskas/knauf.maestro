import express from "express";
import cors from "cors";
import { json } from "body-parser";

import * as routes from "./routes/_index";

import { errorHandler } from "../../errors/src/errorHandler";

const app = express();
app.use(cors());
app.use(json());

app.use(routes.currentUserRouter);
app.use(routes.signInRouter);
app.use(routes.signUpRouter);
app.use(routes.signOutRouter);

app.use(errorHandler);

app.listen(3001, () => {
  console.log("knauf.maestro_auth micro-srv is running");
  console.log("Listening on port 3001");
});
