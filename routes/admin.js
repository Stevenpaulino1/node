const path = require('path')

const express = require('express')
const rootDir = require('../utils/path')

const products = []

router = express.Router()


router.get('/add-product',(req,res,next)=>{
    // console.log(req);
    
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

})

router.post('/add-product',(req,res,next)=>{
    products.push({title: req.body.title})
    console.log('PRODUCT',products);
    console.log("REDIRECTING");

    res.redirect('/')
})

module.exports.routes = router
module.exports.products = products