let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productochema = Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
});

module.exports = mongoose.model("producto",productochema)