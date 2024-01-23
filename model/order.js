const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',

        required: true
    },
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },



});

module.exports = mongoose.model('Order', orderSchema);