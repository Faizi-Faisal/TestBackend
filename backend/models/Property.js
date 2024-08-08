// backend/models/Property.js
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  totalBeds: { type: Number, required: true },
  googleMapUrl: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  singleSharingPrice: { type: Number },
  doubleSharingPrice: { type: Number },
  tripleSharingPrice: { type: Number },
  fourSharingPrice: { type: Number },
  sixSharingPrice: { type: Number },
  amenities: [{ name: String, selected: Boolean }],
  images: [String],
  preferredBy: { type: String, required: true },
  virtualVideoUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Property || mongoose.model('Property', PropertySchema);
