const express = require("express")
const router = express.Router()
//modulos creados
const { Auto } = require('../model/auto')
const {Usuario} = require("../model/usuario")
const auth = require("../middleware/auth")
const { Mongoose } = require("mongoose")
//ruta
router.get('/lista',auth,async(req,res)=>{
  const usuario = await Usuario.findById(req.usuario._id)
  if(!usuario) return res.status(401).send("usuario no existe en DB")
  const Autos = await Auto.find({"idUsuario":usuario._id})
  res.send(Autos)
})
//
router.put('/',auth,async(req,res)=>{
  const usuario = await Usuario.findById(req.usuario._id)
  if(!usuario) return res.status(401).send("el usuario no existe")
  const Autos = await Auto.findByIdAndUpdate(
    req.body._id,
    {
      idUsuario: usuario._id,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      estado: req.body.estado
    },
    {
      new: true
    }
  )
  if(!Autos){
    return  res.status(401).send("no hay un carro para editar")
  }
  res.status(200).send(Autos)
})
//
router.delete('/:_id',auth, async(req,res)=>{
  const usuario = await Usuario.findById(req.body._id)
  if(!usuario) return res.status(401).send("no existe un usuario en bd")
  const Autos = await Auto.findByIdAndDelete(req.params._id)
  if(!Autos) return res.status(401).send("no hay actividad con ese ID")
  res.status(200).send({message:"auto eliminada"})
})
//
router.post("/",auth, async (req,res)=>{
  let autoModelo = await Auto.findOne({modelo: req.body.modelo})
  const usuario = await Usuario.findById(req.usuario._id) 
  if(autoModelo) return res.status(400).send("El auto ya existe en DB")
  let auto = {}
  auto = new Auto({
    idUsuario: usuario._id,
    nombre:req.body.nombre,
    marca:req.body.marca,
    modelo:req.body.modelo,
    precio:req.body.precio,
    color:req.body.color,
  })
  //guardar el usuario en DB
  const result = await auto.save()
  const jwtToken = auto.generateJWT()
  res.status(200).send({jwtToken})
})
module.exports = router