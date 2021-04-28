let express = require("express");
let Usuario = require("../Controllers/usuario");

let api = express.Router();

api.post("/login", Usuario.inicioSesion);
api.post("/registrarUsuario", Usuario.registrarUsuario);

module.exports = api;
