const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    items:[
        
    ],
    userId: Schema.Types.ObjectId,
},{
    methods:{
        createOrder(){
            return this.save()
        }
    }
});

module.exports = mongoose.model('Orders',Order);