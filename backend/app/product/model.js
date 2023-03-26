const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product: {
        type: String,
        require: [true, 'Field products should be exist'],
    },
    name: {
        type: String,
        require: [true, 'Field name should be exist'],
        minlength: 2,
        maxlength: 100
    },
    price: {
        type: Number,
        require: [true, 'Field price should be exist'],
        minlength: 2,
        maxlength: 100
    },
    image_url: {
        type: String
    }

});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;