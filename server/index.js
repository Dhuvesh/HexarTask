import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import bannerRoutes from './routes/banner.route.js';
import aboutRoutes from './routes/about.route.js';
import missionRoutes from './routes/mission.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routing Middleware
app.use('/api/auth', authRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/mission', missionRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server Active on ${PORT}`)))
    .catch(err => console.log('DB Error:', err));