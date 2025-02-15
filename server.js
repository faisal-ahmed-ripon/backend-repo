require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

const app = express();

// ✅ CORS Configuration (Mobile & Laptop থেকে Request Allow করবে)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.set('strictQuery', false);
const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Error হলে সার্ভার বন্ধ করে দেবে
});

// ✅ Orders API Endpoint (POST Request)
app.post('/api/orders', async (req, res) => {
    try {
        console.log('📥 Received order:', req.body);
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error('❌ Order error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// ✅ Get all Orders (GET Request)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Delete Order (DELETE Request)
app.delete('/api/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: '🗑️ Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
