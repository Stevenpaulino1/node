const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  imgURL:{
    type: String,
    required: true
  },

})

module.exports = mongoose.model('Product', productSchema)


// // const crypto = require("crypto");

// //   randomID() {
// //     return crypto.randomBytes(4).toString("hex");
// //   }
// // };

// const mongodb = require("mongodb")
// const getDb = require('../utils/database').getDb

// class Product{
//   constructor(title, price, description, imgURL, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imgURL = imgURL
//         this._id = id ? new mongodb.ObjectId(id) : null
//         this.userId = userId
//       }

//       save(){
//         const db = getDb()
//         let dbOperation;
//         if(this._id){
//           //update the product
//           dbOperation = db.collection('products').updateOne({ _id: this._id }, {$set: this} );
//         }else{

//           dbOperation=db.collection('products').insertOne(this)
//         }
//           return dbOperation.then(result =>{
//             console.log("RESULT",result); 
//           })
//           .catch(err=>{
//             console.log(err);
//           })
//       }

//       static fetchAll(){
//         const db = getDb()
//         return db.collection('products')
//         .find()
//         .toArray()
//         .then(products =>  {
//         return products
//       })
//         .catch(err =>console.log(err))
//       }

//       static findById(productId){
//         const db = getDb()
//         return db.collection("products")
//         .find({_id: new mongodb.ObjectId(productId)})
//         .next()
//         .then(product =>{
//           console.log("PRODUCT findbyid", product)
//           return product
//         })
//         .catch(err => console.log(err))
//       }

//       static deleteById(productId){
//         const db = getDb()
//         return db.collection('products')
//         .deleteOne({_id: new mongodb.ObjectId(productId)})
//         .then(()=> console.log("deleted one"))
//         .catch(err => console.log(err))
//       }
// }

// module.exports = Product