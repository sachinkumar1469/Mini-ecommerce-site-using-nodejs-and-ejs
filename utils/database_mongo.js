const mongdb = require('mongodb')

const MongoClient = mongdb.MongoClient;
let _db;

const mongoConnect = (cb)=>{
    MongoClient.connect('mongodb+srv://sachinyadav1469:Sachin%40123@cluster0.my3twen.mongodb.net/shop?retryWrites=true&w=majority',{
        
    })
        .then(Client=>{
            console.log('connected');
            _db = Client.db();
            // _db.collection('products').
            cb();
        })
        .catch(err=>{
            console.log('error',err);
            throw err;
        })

}
const getDb = ()=>{
    if(_db){
        return _db;
    }
    throw "No Database Found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;