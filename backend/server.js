import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/databaseConnection.js";

// Uncaught Expection Handling
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting Down the server due to uncaughtException");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

// Starts the server on the given port.
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting down the server due to unhandledRejection");
  // Closes the server and exits the process.
  server.close(() => {
    process.exit(1);
  });
});
