import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/databaseConnection.js";

// config. env
dotenv.config({ path: "backend/config/config.env" });

// Connects to the database.
connectDatabase();

// Starts the server on the given port.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting down the server...");
  // Closes the server and exits the process.
  server.close(() => {
    process.exit(1);
  });
});
