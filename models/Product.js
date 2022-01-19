const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const ProductSchema = new Schema({
        name: {
                type: String,
                required: true
        },
        price: {
                type: Number,
                required: true
        },
        img: {
                type: String,
                required: true
        }
});

module.exports = Product = mongoose.model('myproduct', ProductSchema);