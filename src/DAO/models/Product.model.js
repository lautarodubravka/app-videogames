const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', ProductSchema);
