// file: routes/sign-out.ts: This file defines the route for handling the "sign-out" endpoint.
import express from "express";

// Initialize the router instance using express.Router()
const router = express.Router();

// Define the POST route for "/api/users/signout" which sends a simple message as the response
router.post("/api/users/signout", (req, res) => {
  res.send("auth micro-srv sign-out");
});

// Export the router so it can be used in other parts of the application
export { router as signOutRouter };
