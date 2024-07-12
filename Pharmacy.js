const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactInfo: { type: String, required: true },
});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
