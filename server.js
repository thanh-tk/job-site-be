const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.listen(PORT, () => console.log("Example app is listening on port 3000."));
