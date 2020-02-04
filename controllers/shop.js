const Product = require('../models/product')



exports.getProducts = (req,res,next)=>{
  Product.fetchAll((products)=>{
      res.render('shop/products.ejs',{
          prods: products,
          pageTitle:"All Products", 
          path: '/products',
          hasProducts: products.length>0
      })
  })
    // can omit ejs bc we already told app.js ejs is the templating engine
}

exports.getIndex = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index.ejs',{
            prods: products,
            pageTitle:"Shop", 
            path: '/',
            hasProducts: products.length>0
        })
    })
}

exports.getCart = (req,res,next)=>{
    res.render("shop/cart.ejs",{
        path:'/cart',
        pageTitle:"Your Cart"
    })
}

exports.getCheckout = (req,res,next)=>{
    res.render("/shop/checkout.ejs",{
        path:"/checkout",
        pageTitle: "Checkout"
    })
}