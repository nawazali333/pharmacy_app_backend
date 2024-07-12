const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    imageUrl: { type: String },
});

module.exports = mongoose.model('Medicine', MedicineSchema);
