let mongoose = require("mongoose");
const { schema } = require("./usuario");
let Schema = mongoose.Schema;

let stockSchema = Schema({
    idproducto: { type: schema.ObjectId, ref: "producto" },
    cantidad: Number,
});
 module.exports= mongoose.model("stock",stockSchema)