const { PORT, API_URL } = process.env;

import express, { json } from "express";
import { prisma } from "./src/config/db.js"
import JobRouter  from "./src/routes/job.route.js";

// Define the port, defaulting to 3000 if PORT is not defined
const port = PORT || "3000";

// Create an Express app
const app = express();

async function main() {
  // express.json() middleware is used to parse JSON requests.
  app.use(express.json());

  // Register the JobRouter at the /job endpoint
  app.use(API_URL + "/job", JobRouter);

  // Catch unregistered routes
  app.all("*", (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  // Start the server on the specified port
  app.listen(port, () => {
    console.log(`Server Running at ${port}`);
  });
}
// main() -> The entry point for Node.js application. It is responsible for initializing the Express app and registering the controllers.
main()
.then(async () => {
  // Connects to the Prisma database.
  await prisma.$connect();
})
.catch(async (e) => {
  console.error(e);
    // disconnects from the Prisma database.
    await prisma.$disconnect();
    process.exit(1);
  });
  
export default main;