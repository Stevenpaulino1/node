const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const Cart = require('./cart')


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, price, description, imgURL) {
    this.id = id
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgURL = imgURL
  }

  save() {
    getProductsFromFile(products => {
      // console.log("this",this);
      
      if(this.id){
        const existingProdIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProdIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log('PRODUCT SAVE',err);
      });
    }else{
        this.id = this.randomID()
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log("PRODUCT SAVE ELSE",err);
          });
      }
      });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
    getProductsFromFile(products=>{
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }

  static deleteById(id){
    getProductsFromFile(products=>{
      const product = products.find(prod =>prod.id === id)
      const updatedProducts = products.filter(p => p.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
      if(!err){
        Cart.deleteProduct(id, product.price)
      }   
       })
    })
  }

  randomID() {
    return crypto.randomBytes(4).toString("hex");
  }
};
