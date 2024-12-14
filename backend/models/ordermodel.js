const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({
    cartitems: Array,
    amount : String,
    status:String,
    createdAt:String

})

module.exports = mongoose.model('order', orderschema);



