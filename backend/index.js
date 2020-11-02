const express = require("express")
const mongoose = require ("mongoose")
// modulos creados
const auto = require("./routes/auto")
const usuario = require("./routes/usuario")
const auth = require('./routes/auth')
//app
const app = express()
app.use(express.json())
app.use("/api/auto/",auto)
app.use("/api/usuario",usuario)
app.use("/api/auth/",auth)
const port = process.env.PORT || 3003
app.listen(port,()=>{console.log("ejecutando en puerto: ", port);})
//registro en Mongo
mongoose.connect("mongodb://localhost/autoapp",{
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log("conexion con mongo: on");
})
.catch((error)=>{
  console.log("conexion con mongo: off");
})