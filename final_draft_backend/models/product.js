const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    image: { type: String, required: true },
    productName: {type:String ,required:true},
    date:{type:String,required:true},
    description:{type:String,required:true}

});

module.exports = mongoose.model("Product", productSchema);
