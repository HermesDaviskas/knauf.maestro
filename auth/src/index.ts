import { app } from "./app";
import mongoose from "mongoose";

async function startServer() {
  try {
    if (!process.env.JWT_KEY) throw new Error("JWT_KEY not defined");

    // Function to establish a connection to MongoDB
    await mongoose.connect("mongodb://auth-mongo-clusterip-srv:3011/auth");
    console.log("Connected to authentication database.");

    // Start the Express server only after a successful DB connection
    app.listen(3001, () => {
      console.log("knauf.maestro_auth microservice is running");
      console.log("Listening on port 3001");
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error on starting application.", errorMessage);
    process.exit(1);
  }
}

// Start the application
startServer();

export { app };
