// src/controllers/gpaController.js
const User = require('../models/userModel');
const {asyncWrapper} = require("../utils/asyucWrapper");
const {createError} = require("../utils/createError");

exports.getGPA = asyncWrapper(
    async (req, res, next) => {
        const student = await User.findById(req.params.id).select('grades');
        // student.grades = [{ subject: 'Math', score: 90, creditHours: 3}];
        if (!student) {
            return next(createError(404, "not found", "الطالب غير موجود", null));
        }
        // grades: [{ subject: 'Math', score: 90, creditHours: 3}]
        console.log("ss",student.grades );

        if (!student.grades || student.grades.length === 0) {
            return next(createError(400, "failed", "لا يمكن حساب GPA", null))
        }
        let totalPoints = 0, totalCredits = 0;
        student.grades.forEach(item => {
            const gradePoint = item.score >= 90 ? 4.0 : (item.score >= 80 ? 3.0 : (item.score >= 70 ? 2.0 : 1.0));
            totalPoints += gradePoint * item.creditHours;
            totalCredits += item.creditHours;
        });
        const gpa = totalPoints / totalCredits;

        if (isNaN(gpa)) {
            return next(createError(400, "failed", "خطأ في حساب المعدل التراكمي", null))
        }

        return next(createError(200, "success", "GPA retrieved successfully", {gpa: gpa.toFixed(2)}))

    });
//student:{
//   _id: new ObjectId("67fab08b4341f3883a83a203"),
//   name: 'user',
//   email: 'user@gmail.com',
//   password: '$2a$10$c9zdrW4x1HOPMTIrOced0eXF4pOoq3Yg0ohB7E2d4xVhmHJUYOZwu',
//   role: 'student',
//   hasPaidFees: true,
//   __v: 0,
//   grades: [ { creditHours: 3, score: 16, subject: 'Math' } ]
// }const student = await User.findById(req.params.id).select('grades');
