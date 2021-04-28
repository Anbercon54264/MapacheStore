let jwt = require("jwt-simple");
let moment = require("moment");

let mySecret = "trufa1379";

exports.createToken = function (usuario) {
  let payload = {
    _id: usuario._id,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    edad: usuario.edad,
    rol: usuario.rol,
    correo: usuario.correo,
    iat: moment().unix(),
  };
  return jwt.encode(payload,mySecret)
};
