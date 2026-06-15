import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports 
import authRoutes from './routes/auth.js';
import donationRoutes from './routes/donations.js';

dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Expose uploads directory to the public
import path from 'path';
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

