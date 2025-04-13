// src/controllers/materialController.js
const Material = require('../models/materialModel');
const multer = require('multer');
const {asyncWrapper} = require("../utils/asyucWrapper");
const {createError} = require("../utils/createError");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage});

exports.uploadMaterial = asyncWrapper(
    async (req, res, next) => {
        const {courseId, term} = req.body;

        const material  = await Material.create({
            course: courseId,
            term,
            fileUrl: req.file.path,
            uploadedBy: req.user._id
        });
        if (!material) {
            return next(createError(500, "error", "فشل رفع المادة", null))
        }
        return next(createError(201, "success", "تم رفع المادة بنجاح", material))

    });

exports.getMaterialsByTerm = asyncWrapper(
    async (req, res, next) => {
        const {term} = req.params;
        const materials = await Material.find({term}).populate('course', 'title');
        if (!materials) {
            next(createError(500, 'error', "فشل جلب مواد الفصل", null))
        }
        next(createError(200, 'success', "materials", materials))

    });
