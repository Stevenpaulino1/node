const mongodb = require("mongodb")
const getDb = require('../utils/database').getDb

const ObjectId = mongodb.ObjectId

module.exports = class User {
    constructor(name, email, cart, id){
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id
    }

    save(){
     const db = getDb()
     return db.collection('users').insertOne(this)
    }

    addToCart(product){
        const updatedCart = { items: [{productId: new ObjectId(product.id), quantity: 1}]}
        const db = getDb()
        return db
        .collection("users")
        .updateOne(
            {_id: new Object(this._id)},
             {$set:{cart: updatedCart}}
             )
    }

   static findById(userId){
    const db = getDb()
    return db.collection('users').findOne({_id: new ObjectId(userId)}).then(user =>{
        console.log("find by id",user)
        return user
    }).catch(err => console.log(err))
    }
}