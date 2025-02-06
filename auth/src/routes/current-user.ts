// file: routes/current-user.ts: This file defines the route for handling the "current user" endpoint.
import express from "express";

// Initialize the router instance using express.Router()
const router = express.Router();

// Define the GET route for "/api/users/currentuser" which sends a simple message as the response
router.get("/api/users/currentuser", (req, res) => {
  res.send("auth micro-srv current-user");
});

// Export the router so it can be used in other parts of the application
export { router as currentUserRouter };
