const express = require('express')
const path = require('path')
const routes = express.Router()

routes.use("/users",(req,res,next)=>{
    console.log("in users");
    res.sendFile(path.join(__dirname, "../", "views", "users.html"))
    
})

routes.get("/",(req,res,next)=>{
    console.log("root");
    res.sendFile(path.join(__dirname, "../", "views","home.html"))
    
})



module.exports = routes