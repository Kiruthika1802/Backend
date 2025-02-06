const mongoose = require('mongoose');
const { Schema } = mongoose;

const detailSchema = new Schema({
  Username: { type: String },
  ProfileImage: { type: String, default: 'null' },
  Email: { type: String, required: true },
  Password: { type: String, required: true },

}, { timestamps: true });
const Details = mongoose.model('Details', detailSchema);

module.exports = Details;
