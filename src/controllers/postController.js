// src/controllers/postController.js

const Post = require('../models/postModel');
const multer = require('multer');
const path = require('path');
const {asyncWrapper} = require("../utils/asyucWrapper");
const {createError} = require("../utils/createError");

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Error: Images Only!'));
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 10 * 1024 * 1024}, // 10MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

exports.createPost = asyncWrapper(async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return next(createError(400, 'error', `Upload error: ${err.message}`, null));
        } else if (err) {
            return next(createError(400, 'error', err.message || 'حدث خطأ أثناء رفع الصورة', null));
        }

        if (!req.file) {
            return next(createError(400, 'error', 'يرجى رفع صورة واحدة على الأقل', null));
        }

        const {title, content} = req.body;

        if (!title || !content) {
            return next(createError(400, 'error', 'العنوان والمحتوى مطلوبان', null));
        }

        const post = await Post.create({
            title,
            content,
            imageUrl: `/uploads/${req.file.filename}`,
            author: req.user?._id || "67f6ce1c4f0076babd782506" // fallback for testing
        });
        if (!post) {
            return next(createError(500, 'error', 'فشل إنشاء المنشور', null));
        }

        return next(createError(201, "success", 'تم إنشاء المنشور بنجاح', post));
    })

});

exports.getPosts = asyncWrapper(async (req, res, next) => {
    const posts = await Post.find().populate('author', 'name email');

    if (!posts || posts.length === 0) {
        return next(createError(404, "not found", "لا توجد منشورات متاحة", null));
    }
    return next(createError(200, "success", "تم جلب المنشورات بنجاح", posts));

});
