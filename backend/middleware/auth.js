const jwt = require("jsonwebtoken")
function auth(req,res,next){
  let jwtToken = req.header("Authorization")
  jwtToken = jwtToken.split(" ")[1]
  if(!jwtToken) return res.status(401).send("no hay token para validar")
  try{
    const payload = jwt.verify(jwtToken,"auto")
    req.usuario = payload
    next()
  } catch(error) {
    res.status(401).send("token no valido, no auth")
  }
}
module.exports = auth