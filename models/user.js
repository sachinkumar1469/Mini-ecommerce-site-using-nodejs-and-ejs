const {getDb} = require('../utils/database_mongo');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        resetToken:String,
        tokenExpiry:String,
        cart:{
            items:[
                {
                    productId:{
                        type:Schema.Types.ObjectId,
                        required:true
                    },
                    quantity:{
                        type:Schema.Types.Number,
                        required:true
                    }
                }
            ]
        }
    },{
        methods:{
            addToCart(productId,cb){
                const prodIndex = this.cart.items.findIndex((item=>(item.productId.toString() == productId.toString())))
                if(prodIndex == -1){
                    this.cart.items.push({productId: new mongodb.ObjectId(productId),quantity:1})
                } else {
                    this.cart.items[prodIndex].quantity += 1;
                }
                console.log(prodIndex)
                return this.save()
                    .then((result)=>{
                        
                        cb();
                    })
                    .catch(err=>{
                        console.log("ERror while saving cart")
                    })
            },
            updateCart(updatedCart,callback){
                
                return this.save().then(result=>{callback(result)}).catch(err=>{console.log("Unable to update after delete product")})
            }
        }
})




const User = mongoose.model('Users',userSchema)

module.exports = User;