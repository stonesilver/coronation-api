const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: Array, required: true },
    review: { type: Array, required: true },
    likes: { type: Number, default: 0 },
    merchantCountry: { type: String, required: true },
    merchantName: { type: String, required: true },
    merchantUid: { type: String, required: true },
    merchantIsVerified: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
