const Attendance = require('../models/attendanceModel.js');
const Course = require('../models/courseModel.js');
const generateQRCode = require('../utils/generateQRCode');
const {asyncWrapper} = require("../utils/asyucWrapper");
const {createError} = require("../utils/createError");
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const findOneId = require("../utils/findOneId");

const createQRCodeSchema = Joi.object({
    courseId: Joi.string().required(),
    sessionInfo: Joi.object().required(),
});


exports.createQRCode = asyncWrapper(
    async (req, res, next) => {

        const {error} = createQRCodeSchema.validate(req.body);
        if (error) return next(createError(400, 'error', 'Invalid input', error.details));

        const {courseId, sessionInfo} = req.body;

        let course = await findOneId(Course, courseId, 'course');


        // uuid
        const sessionIdentifier = `${courseId}-${Date.now()}`;
        const qrData = JSON.stringify({courseId, sessionIdentifier, sessionInfo});
        const qrCodeFilePath = `uploads/qrCodes/${sessionIdentifier}.png`;
        const qrCodeUrl = await generateQRCode(qrData, qrCodeFilePath);

        return next(createError(200, "success", "QR Code تم إنشاؤه بنجاح", {
            qrCodeUrl,
            sessionIdentifier
        }));

    });


const scanQRCodeSchema = Joi.object({
    courseId: Joi.string().required(),
    sessionIdentifier: Joi.string().required(),
});

exports.scanQRCode = asyncWrapper(
    async (req, res, next) => {
        const {error} = scanQRCodeSchema.validate(req.body);
        if (error) return next(createError(400, 'error', 'Invalid input', error.details));

        const {courseId, sessionIdentifier} = req.body;
        let course = await findOneId(Course, courseId, 'course');

        const attendanceRecord = await Attendance.create({
            student: req.user._id,
            course: courseId,
            sessionIdentifier
        });
        return next(createError(200, "success", "تم تسجيل الحضور بنجاح", attendanceRecord));

    });

exports.getAttendanceByCourse = asyncWrapper(
    async (req, res, next) => {

        const {courseId} = req.params;
        let course = await findOneId(Course, courseId, 'course');
        const attendanceRecords = await Attendance.find({course: courseId}).populate('student', 'name email');
        return next(createError(200, "success", "course attendance", attendanceRecords));
    });
