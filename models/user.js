const mongodb = require("mongodb")
const getDb = require('../utils/database').getDb

const ObjectId = mongodb.ObjectId

module.exports = class User {
    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    save(){
     const db = getDb()
     return db.collection('users').insertOne(this)

    }

   static findById(userId){
    const db = getDb()
    return db.collection('users').findOne({_id: new ObjectId(userId)}).then(user =>{
        console.log("find by id",user)
        return user
    }).catch(err => console.log(err))
    }
}