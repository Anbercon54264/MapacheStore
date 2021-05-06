let express = require("express");
let Producto = require("../Controllers/producto");
let api = express.Router();
let multiparty = require("connect-multiparty")
let path = multiparty({cargas: "./uploads/imgProductos/"})

api.post("/producto/registarProducto",path, Producto.registarProducto);

api.get("/producto/:id", Producto.buscarProductos);

api.get("/producto", Producto.cargarProductos);

api.post("/producto/:nombre?", Producto.cargarProductos);

api.put("/producto/actualizarProducto/:id", Producto.actualizarProducto);

api.delete("/producto/borrarProducto/:id", Producto.borrarProducto);

module.exports = api;

