//modulos internos
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
//esquema
const esquemaAuto = new mongoose.Schema({
  idUsuario: String,
  nombre:{
    type : String,
  },
  marca:{
    type : String,
  },
  color:{
    type : String,
  },
  precio:{
    type : Number,
  },
  modelo:{
    type : String,
  },
  fechaRegistro:{
    type : Date,
    default : Date.now
  }
})
//generamos JWT
esquemaAuto.methods.generateJWT = function(){
  return jwt.sign({
    _id:this._id,
    nombre:this.nombre,
    modelo:this.modelo,
    marca:this.marca
  },"auto")
}
//crear los exports
const Auto = mongoose.model("auto", esquemaAuto)
module.exports.Auto = Auto
module.exports.esquemaAuto = esquemaAuto