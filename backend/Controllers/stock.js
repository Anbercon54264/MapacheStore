let mongoose = require("mongoose");
let Stock = require("../Models/stock");

const registrarStock = (req, res) => {
  let params = req.body;
  let stock = new Stock();
  if (params.idproducto && params.cantidad) {
    stock.idproducto = params.idpproducto;
    stock.cantidad = params.cantidad;
    stock.save((err, guardarStock) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (guardarStock) {
          res.status(200).send({ stock: guardarStock });
        } else {
          res.status(401).send({ mensaje: "No se registro el Stock" });
        }
      }
    });
  } else {
    res.status(401).send({ mensaje: "Falto alguno de los datos" });
  }
};

module.exports = {
  registrarStock,
};
