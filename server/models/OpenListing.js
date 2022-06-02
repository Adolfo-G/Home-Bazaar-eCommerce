const { Schema, model } = require('mongoose');

const openListingSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  
});

const OpenListing = model('OpenListing', openListingSchema);

module.exports = OpenListing;
