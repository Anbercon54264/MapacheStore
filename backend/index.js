let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

//puerto
let port = process.env.port || 3015;

let app = express();
//routes
let Usuario = require("./Routes/usuario");
let Producto = require("./Routes/producto");
let Stock = require("./Routes/stock");

//conexion db
mongoose.connect(
  "mongodb://localhost:27017/mapachestoredb",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("Servidor DB: TODO BIEN");
      app.listen(port, function () {
        console.log("SERVIDOR BACKEND CORRIENDO POR EL PUERTO :" + port);
      });
    }
  }
);
//analizamos las url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//rutas para las api
app.use("/api", Usuario);
// app.use("/api", Producto);
// app.use("/api", Stock);

module.exports = app;
