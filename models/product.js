const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    image: String,
    prices: {
        "100g": Number,
        "250g": Number,
        "500g": Number,
        "1kg": Number
    }
});

module.exports = mongoose.model('Product', productSchema);