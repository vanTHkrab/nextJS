const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Veterinary Clinic!');
});

module.exports = (db) => {
    router.get('/doctors', async (req, res) => {
        const results = await db.query('SELECT * FROM `doctors`');
        res.json({ success: true, doctors: results[0] });
    });
    return router;
}