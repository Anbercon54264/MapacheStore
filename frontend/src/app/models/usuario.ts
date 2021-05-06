export class Usuario {
    //generamos el constructor
    constructor(
        public _id:String,
        public nombres: String,
        public apellidos: String,
        public edad: Number,
        public rol: String,
        public correo : String,
        public pass: String,
        public getToken: boolean,
    ){}
}