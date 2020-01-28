const express = require('express')

router = express.Router()

router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button>add product</button></form>')

})

router.post("/product",(req,res,next)=>{
    console.log("req.body",req.body);
    
    res.redirect('/')
})

module.exports = router