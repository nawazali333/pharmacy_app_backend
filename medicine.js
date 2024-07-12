const express = require('express');
const Medicine = require('../models/Medicine');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
    const { pharmacyId, name, description, price, discount } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    try {
        const newMedicine = new Medicine({ pharmacyId, name, description, price, discount, imageUrl });
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:pharmacyId', async (req, res) => {
    try {
        const medicines = await Medicine.find({ pharmacyId: req.params.pharmacyId });
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMedicine);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.json({ message: 'Medicine deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
