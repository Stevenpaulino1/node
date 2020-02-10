const Product = require('../models/product')
const Cart = require('../models/cart')



exports.getProducts = (req,res,next)=>{
    console.log('GET PRODUCTS')
    Product.fetchAll().then(products => {
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
    Cart.getCart((cart)=>{
        Product.fetchAll(products =>{
            const cartProducts = []
            for(product of products){
                const cartProductData = cart.products.find(prod=>prod.id === product.id)
            if (cartProductData){
                cartProducts.push({productData:product, qty: cartProductData.qty })
            }
            }
            res.render("shop/cart.ejs",{
                path:'/cart',
                pageTitle:"Your Cart",
                products:cartProducts
            })
        })
    })
}

exports.postCart = (req,res,next)=>{

    const prodId = req.body.productId
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart')
}

exports.postCartDeleteProduct=(req,res,next)=>{
    // const { productId, productPrice} = req.body; 
    const { productId} = req.body; 
    Product.findById(productId, product =>{
        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
    })
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