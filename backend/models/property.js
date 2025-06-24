// نموذج العقار (MongoDB/Mongoose)
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  price: String,
  status: String,
  images: [String],
  panorama: String,
  model3d: String, // اسم أو مسار ملف 3D
  nftId: String,
  owner: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
