const express = require('express');
const router = express.Router();
const { publishWebApp } = require('../controllers/publishController');

// POST /api/publish
router.post('/', publishWebApp);

module.exports = router;
