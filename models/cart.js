const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename),'data','cart.json');



exports.Cart = class Cart{
    // constructor(productId){
    //     this.products = [];
    //     this.toalPrice = o;
    // }

    static addProduct(productId,productPrice,cb){
        // Fetch the previous cart
        fs.readFile(p,(err,data)=>{
            let cart = {products:[],totalPrice:0}
            if(!err){
                cart = JSON.parse(data);
            }
            // Analyze that cart => .find()
            const existingProduct = cart.products.find(product=>(product.id === productId));
            const existingProductIndex = cart.products.findIndex(prodct=>(prodct.id === productId));
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct,qty:existingProduct.qty + 1};
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id:productId,
                    qty:1,
                }
                cart.products = [...cart.products,updatedProduct];
            }
            // Update the cart price
            cart.totalPrice = cart.totalPrice + productPrice;

            // Update the cart in file cart.json
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
                cb();
            })
        })
    }
    static getCart(cb){
        fs.readFile(p,(err,data)=>{
            if(err){
                cb({products:[]});
            } else {
                cb(JSON.parse(data));
            }
        })
    }
}