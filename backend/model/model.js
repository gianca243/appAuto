//modulos internos
const mongoose = require('mongoose')
const esquemaModelo = new mongoose.Schema({
  idUsuario: String,
  nombre: String,
  descripcion: String,
  sticker: String,
  fecha:{
    type:Date,
    default: Date.now
  }
})
//Creamos los exports
const modelo = mongoose.mode("modelo", esquemaModelo)
module.exports.model = model