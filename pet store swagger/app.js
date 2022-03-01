const express = require("express");
const cors = require("cors");
const router = require("./app/routes/index");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
