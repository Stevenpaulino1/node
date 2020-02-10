const {password} = require('../mykeys.js')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _database;

const mongoConnect = (callback)=>{
    MongoClient.connect(`mongodb+srv://stevenpaulino1:${password}@cluster0-13cav.mongodb.net/test?retryWrites=true&w=majority`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true, 
    }
    )
    .then(client => {
        _database = client.db()
        // console.log('connected', _database)
        callback()
    })
    .catch(err =>{
        // console.log(err); 
        throw err; 
    })
}

const getDb = () =>{
    // console.log("WHAT IS DB",_db);
    if(_database){
        return _database
    }
}



exports.mongoConnect = mongoConnect;
exports.getDb = getDb