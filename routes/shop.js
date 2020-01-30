const path = require('path')

const express = require('express')

const rootDir = require('../utils/path')
const admin = require('./admin')


const router = express.Router()

router.get('/',(req,res,next)=>{
    // console.log("from shop",admin.products);
    
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    const products = admin.products
    res.render('shop.pug',{prods: products,docTitle:"Shop"})
    // can omit pug bc we already told app.js pug is the templating engine
})

module.exports = router