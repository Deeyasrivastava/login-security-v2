require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const logger = require('./src/utils/logger');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
