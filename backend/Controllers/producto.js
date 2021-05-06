let mongoose = require("mongoose");
let Producto = require("../Models/producto");
let fs = require("fs");
let path = require("path");
let moment = require("moment");

const registarProducto = (req, res) => {
  let params = req.body;
  let producto = new Producto();

  if (params.nombre && params.descripcion && params.precio) {
    let imagenPath = req.files.imagen.path;
    let nameImg = moment().unix();
    let rutaServer =
      "./uploads/imgProductos/" + nameImg + path.extname(imagenPath);
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    let dbImg = nameImg + path.extname(imagenPath);

    producto.nombre = params.nombre;
    producto.descripcion = params.descripcion;
    producto.precio = params.precio;
    producto.imagen = dbImg;
    console.log(rutaServer)
    producto.save((err, guardarProducto) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar" });
      } else {
        if (guardarProducto) {
          res.status(200).send({ producto: guardarProducto });
        } else {
          res.status(401).send({ mensaje: "No se pudo registrar el producto" });
        }
      }
    });
  } else {
    res.status(401).send({ mensaje: "Falto alguno de los datos" });
  }
};

const buscarProductos = (req, res) => {
  let id = req.params["id"];
  Producto.findById({ _id: id }, (err, encontrarProducto) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar" });
    } else {
      if (encontrarProducto) {
        res.status(200).send({ producto: encontrarProducto });
      } else {
        res.status(401).send({ mensaje: "El producto no existe" });
      }
    }
  });
};

const cargarProductos = (req, res) => {
  let nombre = req.params["nombre"];
  Producto.find({ nombre: new RegExp(nombre, "i") }, (err, listaProductos) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (listaProductos) {
        res.status(200).send({ producto: listaProductos });
      } else {
        res.status(401).send({ mensaje: "No hay Productos" });
      }
    }
  });
};

const actualizarProducto = (req, res) => {
  let id = req.params["id"];
  let params = req.body;
  Producto.findByIdAndUpdate(
    { _id: id },
    { nombre: params.nombre, descripcion: params.descripcion },
    (err, datosProducto) => {
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (datosProducto) {
          res.status(200).send({ producto: datosProducto });
        } else {
          res
            .status(401)
            .send({ mensaje: "la producto no se pudo actualizar" });
        }
      }
    }
  );
};

const borrarProducto = (req, res) => {
  let id = req.params["id"];
  Producto.findByIdAndDelete({ _id: id }, (err, datosProducto) => {
    if (err) {
      res.status(500).send({ mensaje: "Error al conectar al servidor" });
    } else {
      if (datosProducto) {
        res.status(200).send({ producto: datosProducto });
      } else {
        res.status(401).send({ mensaje: "la categoria no se pudo borrar" });
      }
    }
  });
};

module.exports = {
  registarProducto,
  buscarProductos,
  cargarProductos,
  actualizarProducto,
  borrarProducto,
};
