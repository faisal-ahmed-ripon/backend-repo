const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    message: String,
    orderType: {
        type: String,
        enum: ['registration', 'product'],
        default: 'registration'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);