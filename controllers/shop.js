const Product = require('../models/product')



exports.getProducts = (req,res,next)=>{
  Product.fetchAll((products)=>{
      res.render('shop/products.ejs',{
          products: products,
          pageTitle:"All Products", 
          path: '/products',
          hasProducts: products.length>0
      })
  })
    // can omit ejs bc we already told app.js ejs is the templating engine
}

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId    
    Product.findById(prodId, product =>{
    res.render('shop/product-detail',{
        product: product,
        pageTitle:` ${product.title} Details`,
        path: '/products'
    })        
    })
    
}

exports.getIndex = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/products.ejs',{
            products: products,
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

exports.postCart = (req,res,next)=>{
    const prodId = req.body.productId
    res.redirect('/cart')
    
}

exports.getCheckout = (req,res,next)=>{
    res.render("/shop/checkout.ejs",{
        path:"/checkout",
        pageTitle: "Checkout"
    })
}
exports.getOrders = (req,res,next)=>{
    res.render("/shop/orders.ejs",{
        path:"/orders",
        pageTitle: "Your Orders"
    })
}