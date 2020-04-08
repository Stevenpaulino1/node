const Product = require('../models/product')
const Order = require('../models/order')




exports.getProducts = (req,res,next)=>{
    // console.log('GET PRODUCTS')
    Product.find().then(products => {
      console.log("PRODUCTS",products)
      res.render('shop/products.ejs',{
        products: products,
        pageTitle:"All Products", 
        path: '/products',
        hasProducts: products.length>0
    })
    })
  .catch(err =>console.log(err))
    // can omit ejs bc we already told app.js ejs is the templating engine
}

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId    
    Product.findById(prodId).then(product =>{
    res.render('shop/product-detail',{
        product: product,
        pageTitle:` ${product.title} Details`,
        path: '/products'
    })        
    }).catch(err => console.log("err in get product", err))
    
}

exports.getIndex = (req,res,next)=>{
    Product.find().then((products)=>{
        res.render('shop/index.ejs',{
            products: products,
            pageTitle:"Shop", 
            path: '/',
            hasProducts: products.length > 0
        })
    })
}

exports.getCart = (req,res,next)=>{
   req.user
   .populate('cart.items.productId')
   .execPopulate()
   .then(user =>{
       const products = user.cart.items
       console.log("user", products)
       res.render('shop/cart', {
           path: '/cart',
           pageTitle: "Your Cart",
           products: products
       })
   })
   .catch(err => console.log(err))
    
}

exports.postCart = (req,res,next)=>{
    const prodId = req.body.productId
    Product.findById(prodId)
    .then(product =>{
        return req.user.addToCart(product)
        
    })
    .then(result => {
        res.redirect('/cart')
    }).catch(err => console.log(err))
}

exports.postCartDeleteProduct=(req,res,next)=>{
    const { productId} = req.body; 
    req.user.deleteItemFromCart(productId)
    .then(result =>{
        res.redirect('cart')
    })
    .catch(err => console.log(err))
}

exports.getCheckout = (req,res,next)=>{
    res.render("/shop/checkout.ejs",{
        path:"/checkout",
        pageTitle: "Checkout"
    })
}
exports.getOrders = (req,res,next)=>{
    req.user.getOrders().then(orders =>{

        res.render("/shop/orders.ejs",{
            path:"/orders",
            pageTitle: "Your Orders",
            orders: orders 
        })
    })
}
exports.postOrders = (req,res,next)=>{
    req.user
    .populate('cart.items.productId').execPopulate()
    .then(user => {
        const products = user.cart.items.map(i => {
            return {quantity: i.quantity, product: {...i.productId._doc}}
        })
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products  
        })
        return order.save()
    })
    .then(result =>{
        res.redirect("/shop/orders.ejs")
    }).catch(err => console.log(err))
}