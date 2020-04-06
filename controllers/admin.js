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
    const product = new Product({title,price,description,imgURL})
    product.save()
    .then(result =>{
        res.redirect('/admin/products')

    })
    .catch(err => console.log(err)
    )
    console.log("REDIRECTING");
}

exports.getEditProduct = (req,res,next)=>{
    // console.log(req.query);
    //query prop lives on request obj

    
    const editMode = req.query.edit 
    if(!editMode){
        return res.redirect('/')
    }
    const prodId = req.params.productId
    Product.findById(prodId).then(
         product =>{
            console.log("GET EDIT: WHAT IS PROD", product)

            if(!product){
                return res.redirect('/')
            }
            res.render('admin/edit-product.ejs', {
                pageTitle:"Edit Product",
                product: product,
                path:"admin/edit-product",
                editing:editMode
        })
        }
    )
}

exports.postEditProduct=(req,res,next)=>{
    const prodId = req.body.productId 
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imgURL = req.body.imgURL;
    Product.findById(prodId)
    .then(product => {
        product.title = title,
        product.price = price,
        product.description = description,
        product.imgURL = imgURL
       return product.save()
    })
    .then(result =>{
        res.redirect('/admin/products')
    }).catch(err => console.log(err))
}

exports.getProducts = (req,res,next)=>{
    Product.find().then((products)=>{
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