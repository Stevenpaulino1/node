const Product = require('../models/product')


exports.getAddProduct = (req,res,next)=>{
    res.render('admin/edit-product.ejs', {
        pageTitle:"Add Product",
        path:"admin/add-product",
        editing: false
    })
}

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imgURL = req.body.imgURL;
    const product = new Product(null,title,price,description,imgURL)
    product.save()
    console.log("REDIRECTING");
    res.redirect('/')
}

exports.getEditProduct = (req,res,next)=>{
    console.log(req.query);
    //query prop lives on request obj

    
    const editMode = req.query.edit 
    if(!editMode){
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findById(prodId, product =>{
        if(!product){
            return res.redirect('/')
        }
        res.render('admin/edit-product.ejs', {
            pageTitle:"Edit Product",
            product: product,
            path:"admin/edit-product",
            editing:editMode
    })
    })
}

exports.postEditProduct=(req,res,next)=>{
    const prodId = req.body.productId 
    console.log("prodid",prodId);
    
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imgURL = req.body.imgURL;
    updatedProduct = new Product(prodId ,title,price,description,imgURL)  
    console.log(updatedProduct);
    
    updatedProduct.save() 
    res.redirect('/admin/products')
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

exports.postDeleteProduct = (req,res,next)=>{
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}