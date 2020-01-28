const express = require('express')

const router = express.Router()

router.use('/',(req,res,next)=>{
    console.log("home");
    
    res.send("<h1>From express!</h1>")
})

module.exports = router