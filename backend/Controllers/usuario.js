let Usuario = require("../Models/usuario");
let bcrypt = require("bcrypt-nodejs");

let jwt = require("../libs/jwt");

const registrarUsuario = (req, res) => {
  let params = req.body;
  let usuario = new Usuario();

  if (
    params.nombres &&
    params.apellidos &&
    params.edad &&
    params.rol &&
    params.correo &&
    params.pass
  ) {
    bcrypt.hash(params.pass, null, null, function (err, hash) {
      if (hash) {
        usuario.nombres = params.nombres;
        usuario.apellidos = params.apellidos;
        usuario.edad = params.edad;
        usuario.rol = params.rol;
        usuario.correo = params.correo;
        usuario.pass = params.pass;
        usuario.save((err, guardaUsuario) => {
          if (err) {
            res.status(500).send({ err: "No se registro el usuario" });
          } else {
            res.status(200).send({ usuario: guardaUsuario });
          }
        });
      }
    });
  } else {
    res.status(405).send({ err: "No se guardo un dato" });
  }
};

const inicioSesion = (req, res) => {
  let params = req.body;
  Usuario.findOne({ correo: params.correo }, (err, obtieneDatosUsuario) => {
    if (err) {
      res.status(500).send({ mensaje: "Error del servidor" });
    } else {
      if (obtieneDatosUsuario) {
        bcrypt.compare(
          params.pass,
          obtieneDatosUsuario.pass,
          function (err, todoBien) {
            if (todoBien) {
              if (params.getToken) {
                res
                  .status(200)
                  .send({ jwt: jwt.createToken(obtieneDatosUsuario) });
              } else {
                res
                  .status(200)
                  .send({ usuario: datosUsuario, mensaje: "Sin TOKEN" });
              }
            } else {
              res.status(401).send({ mensaje: "correo o password incorrecto" });
            }
          }
        );
      } else {
        res.status(401).send({ mensaje: "correo o password incorrecto" });
      }
    }
  });
};

module.exports = {
  registrarUsuario,
  inicioSesion,
};
