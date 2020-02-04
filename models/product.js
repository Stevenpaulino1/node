const fs = require('fs');
const path = require('path');
const crypto = require("crypto");


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
  constructor(title, price, description, imgURL) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgURL = imgURL
  }

  save() {
    this.id = this.randomID()
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
    // console.log("id",id);
    getProductsFromFile(products=>{
      // console.log("what is:", id);
      const product = products.find(p => p.id === id)
      // console.log("models",product);
      
      cb(product)
    })
  }

  randomID() {
    return crypto.randomBytes(4).toString("hex");
  }
};
