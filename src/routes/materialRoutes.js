// src/routes/materialRoutes.js
const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const {protect, checkRole} = require('../middleware/auth');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.route('/upload')
    .post(protect, checkRole(['professor', 'TA']), upload.single('file'), materialController.uploadMaterial);//protect, checkRole(['professor', 'TA']), upload.single('file'),

router.route('/:term')
    .get(protect, checkRole('student'), materialController.getMaterialsByTerm);//protect, checkRole('student'),

module.exports = router;
