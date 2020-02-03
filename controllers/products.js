const Product = require('../models/product')

exports.getAddProduct = (req,res,next)=>{
    res.render('add-product.ejs', {pageTitle:"Add Product", path:"admin/add-product"})
}

exports.postAddProduct = (req,res,next)=>{
    const product = new Product(req.body.title)
    product.save()
    console.log("REDIRECTING");
    res.redirect('/')
}

exports.getProducts = (req,res,next)=>{
  Product.fetchAll((products)=>{
      res.render('shop',{
          prods: products,
          pageTitle:"Shop", 
          path: '/',
          hasProducts: products.length>0
      })
  })
    // can omit pug bc we already told app.js pug is the templating engine
}