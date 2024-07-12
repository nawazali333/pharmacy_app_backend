// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const redis = require('redis');
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/pharmacy', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const client = redis.createClient();

// client.on('error', (err) => {
//     console.error('Redis error: ', err);
// });

// // Models
// const User = require('./models/User');
// const Pharmacy = require('./models/Pharmacy');
// const Medicine = require('./models/Medicine');

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/pharmacies', require('./routes/pharmacy'));
// app.use('/api/medicines', require('./routes/medicine'));

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const redis = require('redis');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pharmacy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

// Models
const User = require('./models/User');
const Pharmacy = require('./models/Pharmacy');
const Medicine = require('./models/Medicine');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pharmacies', require('./routes/pharmacy'));
app.use('/api/medicines', require('./routes/medicine'));

// Cache middleware
const cache = (req, res, next) => {
    const { pharmacyId } = req.params;
    client.get(pharmacyId, (err, data) => {
        if (err) throw err;
        if (data !== null) {
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

app.get('/api/medicines/:pharmacyId', cache, async (req, res) => {
    try {
        const medicines = await Medicine.find({ pharmacyId: req.params.pharmacyId });
        client.setex(req.params.pharmacyId, 600, JSON.stringify(medicines));
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
