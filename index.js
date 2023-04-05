require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3001;
const Router = require("./src/routes");

app.use(morgan("dev"));
app.use(cors());

app.use(Router);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log("App listening to port :" + port);
});
