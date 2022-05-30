const { Schema, model } = require('mongoose');

const listingSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  imageRef: {
    type: Number,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  }
});

const Listing = model('Listing', listingSchema);

module.exports = Listing;
