const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: Object, required: true },
    review: { type: Array, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
