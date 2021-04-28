let express = require("express");
let Stock = require("../Controllers/stock");

let api = express.Router();

api.post("/stock/registrarStock", Stock.registrarStock);

module.exports = api;
