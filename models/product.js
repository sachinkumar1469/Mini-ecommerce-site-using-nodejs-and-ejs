// Import db connection from utils/database

const db = require('../utils/database')

exports.Product = class Product{
    constructor(product){
        const {title,imageUrl,description,price} = product;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save(cb){   
        db.execute(`INSERT INTO products (title,price,description,imageUrl) VALUES ('${this.title}',${this.price},'${this.description}','${this.imageUrl}')`)
            .then((result)=>{
                // console.log(result);
                cb();
            })
            .catch((err)=>{
                console.log('error in saving product in db');
                // console.log(err);
                cb();
            })        
    }
  
    static getProducts(cb){
        db.execute('SELECT * FROM products').then((result)=>{
            cb(result[0]);           
        }).catch((err)=>{
            console.log('error in getting product from db')
        });
        
    }

    static getProductUsingId(cb,id){
        
        db.execute(`SELECT * FROM products WHERE id=${id}`)
            .then((result)=>{ 
                // console.log(result[0]);            
                cb(result[0]);
            })
            .catch((err)=>{
                console.log('error');
            })      
    }

    static updateProduct(product,cb){
        let {id,title,price,description,imageUrl} = product;
        id = JSON.parse(id);
        db.execute(`UPDATE products SET title='${title}',price=${price},description='${description}',imageUrl='${imageUrl}' WHERE id=${id}`)
            .then((res)=>{
                // console.log('succesfull',res);
                cb();
            })
            .catch((err)=>{
                console.log('error while updating',err);
                cb();
            })
    }
    static deleteProduct(id,cb){
        console.log(id);
        db.execute(`DELETE FROM products WHERE id=${id}`)
            .then((res)=>{
                // console.log('deleted',res)
                cb();
            })
            .catch((err)=>{
                console.log('Error in deleting the product in db');
                cb();
            })
    }
}