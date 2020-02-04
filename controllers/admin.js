const Product = require('../models/product')


exports.getAddProduct = (req,res,next)=>{
    res.render('admin/add-product.ejs', {pageTitle:"Add Product", path:"admin/add-product"})
}

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imgURL = req.body.title;

    const product = new Product(title,price,description,imgURL)
    product.save()
    console.log("REDIRECTING");
    res.redirect('/')
}

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products.ejs',{
            products: products,
            pageTitle:"Admin Products", 
            path: 'admin/products',
            hasProducts: products.length>0
        })
    })
}