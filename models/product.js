// Import db connection from utils/database

const db = require('../utils/database')

exports.Product = class Product{
    constructor(title,imageUrl,productPrice){
        this.title = title;
        this.imageUrl = imageUrl;
        this.productPrice = productPrice;
    }
    save(){   
        this.id = Math.random().toString();
            
    }
  
    static getProducts(cb){
        db.execute('SELECT * FROM products').then((result)=>{
            cb(result[0]);           
        }).catch((err)=>{
            console.log(err);
        });
        
    }

    static getProductDetail(cb,id){
        
    }

    static updateProduct(product,cb){
        
    }
}