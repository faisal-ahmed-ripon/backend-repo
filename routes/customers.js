const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Create new customer
router.post('/', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Debug log

        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });

        const savedCustomer = await customer.save();
        console.log('Saved customer:', savedCustomer); // Debug log

        res.status(201).json(savedCustomer);
    } catch (error) {
        console.error('Error saving customer:', error); // Debug log
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;