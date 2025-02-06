// file: routes/sign-in.ts: This file defines the route for handling the "sign-in" endpoint.
import express from "express";

// Initialize the router instance using express.Router()
const router = express.Router();

// Define the POST route for "/api/users/signin" which sends a simple message as the response
router.post("/api/users/signin", (req, res) => {
  res.send("auth micro-srv sign-in");
});

// Export the router so it can be used in other parts of the application
export { router as signInRouter };
