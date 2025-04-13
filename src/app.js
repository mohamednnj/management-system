require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load('./swagger.yaml');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const examRoutes = require('./routes/examRoutes');
const materialRoutes = require('./routes/materialRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const gpaRoutes = require('./routes/gpaRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);


app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/materials', materialRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/students', gpaRoutes);
app.use('/api/v1/attendance', attendanceRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('*', (req, res, next) => {
    return res.status(404).json({statusCode: 404, status: "error", msg: "Route Not Found"});
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        statusCode: error.statusCode,
        status: error.status || 500,
        message: error.message || "id failed or server error",
        data: error.data || null
    });
})
// بدء الاتصال بقاعدة البيانات وتشغيل الخادم
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`S🚀 Server running on http://localhost:${PORT}`));
});

module.exports = app;
/* Login */


