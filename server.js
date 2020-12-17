require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const routes = require("./app/routes");
const api = require("./app/api");

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/app/public/")); // serve static files for client to download
app.set("view engine", "ejs");
app.set("views", "./app/views/pages"); // Specified path as 'veiws' folder is not on root _dir

// Navigation
app.use("/", routes);

// API
app.use("/api", api);

// 404 / error handler below

module.exports = app;
