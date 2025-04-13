// src/routes/gpaRoutes.js
const express = require('express');
const router = express.Router();
const gpaController = require('../controllers/gpaController');
const {protect, checkRole} = require('../middleware/auth');

router.route('/:id/gpa')
    .get(protect, checkRole('student'), gpaController.getGPA); //protect, checkRole('student'),

module.exports = router;
