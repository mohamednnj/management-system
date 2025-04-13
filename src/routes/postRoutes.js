// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const {protect, checkRole} = require('../middleware/auth');

router.route('/')
    .post(protect, checkRole(['professor', 'TA', 'staff']), postController.createPost)//protect, checkRole(['professor', 'TA', 'staff']),
    .get(protect, postController.getPosts);//protect,

module.exports = router;
