const {mongoConnect, getDb} = require('../utils/database_mongo');
const mongodb = require('mongodb');
class Products{
    constructor(title,imageUrl,description,price,userId){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.userId = userId;
    }
    save(){
        // This is how you insert in mongodb database
        const db = getDb();
        db.collection('products').insertOne(this)
            .then(response=>{
                console.log(response);
            })
            .catch(err=>{
                console.log("Unable to insert product document into products collection")
                // Collection in similar to table and document is similar to record
            })
    }
    static getAllProducts(){
        const db = getDb();
        // Insted of returning promise find() return an cursor it doesn't return entire documents because there could be million of them
        // We can chain .toArray() to find() to get all the documents in an javascript array;
        // and toArray return a promise;
        return  db.collection('products')
                .find()
                .toArray()
                .then(result=>{
                    return result;
                })
                .catch(err=>{
                    return err;
                });
            
    }
    static findById(productId){
        // console.log(productId);
        const db = getDb();
        return db.collection('products')
                .find({_id:new mongodb.ObjectId(productId)})
                .next()
                .then(result=>{
                    return result;
                })
                .catch(error=>{
                    console.log("Error in finding one product");
                    return error;
                });
    }
    static deleteById(productId){
        const db = getDb();
        return db.collection('products').deleteOne({_id:mongodb.ObjectId(productId)});
    }
    static updateById(products){
        const db = getDb();
        return db.collection('products').updateOne({_id:mongodb.ObjectId(products.id)},{$set:products});
        
    }
}





module.exports = Products;


















































// exports.Product = class Product{
//     constructor(product){
//         const {title,imageUrl,description,price} = product;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//     save(cb){   
//         db.execute(`INSERT INTO products (title,price,description,imageUrl) VALUES ('${this.title}',${this.price},'${this.description}','${this.imageUrl}')`)
//             .then((result)=>{
//                 // console.log(result);
//                 cb();
//             })
//             .catch((err)=>{
//                 console.log('error in saving product in db');
//                 // console.log(err);
//                 cb();
//             })        
//     }
  
//     static getProducts(cb){
//         db.execute('SELECT * FROM products').then((result)=>{
//             cb(result[0]);           
//         }).catch((err)=>{
//             console.log('error in getting product from db')
//         });
        
//     }

//     static getProductUsingId(cb,id){
        
//         db.execute(`SELECT * FROM products WHERE id=${id}`)
//             .then((result)=>{ 
//                 // console.log(result[0]);            
//                 cb(result[0]);
//             })
//             .catch((err)=>{
//                 console.log('error');
//             })      
//     }

//     static updateProduct(product,cb){
//         let {id,title,price,description,imageUrl} = product;
//         id = JSON.parse(id);
//         db.execute(`UPDATE products SET title='${title}',price=${price},description='${description}',imageUrl='${imageUrl}' WHERE id=${id}`)
//             .then((res)=>{
//                 // console.log('succesfull',res);
//                 cb();
//             })
//             .catch((err)=>{
//                 console.log('error while updating',err);
//                 cb();
//             })
//     }
//     static deleteProduct(id,cb){
//         console.log(id);
//         db.execute(`DELETE FROM products WHERE id=${id}`)
//             .then((res)=>{
//                 // console.log('deleted',res)
//                 cb();
//             })
//             .catch((err)=>{
//                 console.log('Error in deleting the product in db');
//                 cb();
//             })
//     }
// }