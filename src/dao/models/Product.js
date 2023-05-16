const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    ageRating: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
