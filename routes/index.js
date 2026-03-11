const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => res.render('index'));

// API para servir el GeoJSON
router.get('/api/monumentos', (req, res) => {
    // IMPORTANTE: Asegúrate de que el archivo esté en /data/monumentos.geojson
    const geojsonPath = path.join(__dirname, '../data/monumentos.geojson');
    if (fs.existsSync(geojsonPath)) {
        const rawData = fs.readFileSync(geojsonPath, 'utf8');
        res.json(JSON.parse(rawData));
    } else {
        res.status(404).json({ error: "Archivo GeoJSON no encontrado" });
    }
});

// Login solicitado: admin / 1234
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        req.session.isLogged = true;
        req.session.user = { username: 'admin' };
        res.json({ ok: true });
    } else {
        res.json({ ok: false });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;