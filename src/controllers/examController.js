// src/controllers/examController.js
const Exam = require('../models/examModel');
const User = require('../models/userModel');
const {asyncWrapper} = require("../utils/asyucWrapper");
const {createError} = require("../utils/createError");

exports.createExam = asyncWrapper(
    async (req, res, next) => {
    const {courseId, title, startTime, endTime, questions} = req.body;
    const exam = await Exam.create({
        course: courseId,
        title,
        startTime,
        endTime,
        questions
    });
    if (!exam) {
        return next(createError(400,'error','invalid data',null));
    }
    return next(createError(201,'success','تم إنشاء الاختبار بنجاح',exam));

});

exports.submitExam = asyncWrapper(
    async (req, res, next) => {

        const {id} = req.params;
        const {answers} = req.body;

        const exam = await Exam.findById(id);
        if (!exam) {
            return next(createError(404, 'success', 'الاختبار غير موجود', null))
        }
        // calculate total point
        let score = 0;
        exam.questions.forEach((q, index) => {
            if (answers[index] && answers[index] === q.correctAnswer) {
                score += 1;
            }
        });

        return next(createError(200, 'success', 'تم تقديم الاختبار بنجاح', {
            score,
            total: exam.questions.length
        }))

    });
