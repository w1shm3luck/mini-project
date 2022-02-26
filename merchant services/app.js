const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./app/routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
