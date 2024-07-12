const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newPharmacy = new Pharmacy(req.body);
        await newPharmacy.save();
        res.status(201).json(newPharmacy);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const pharmacies = await Pharmacy.find();
        res.json(pharmacies);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        res.json(pharmacy);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedPharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPharmacy);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Pharmacy.findByIdAndDelete(req.params.id);
        res.json({ message: 'Pharmacy deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
