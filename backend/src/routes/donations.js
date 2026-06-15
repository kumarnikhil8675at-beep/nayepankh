import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createDonation, getDonations } from '../controllers/donations.js';
import { protect } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/role.js';

const router = express.Router();

// Optional auth middleware so logged-in users get linked, but guests can donate
const optionalProtect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      console.error('Invalid token on optional auth in donations router');
    }
  }
  next();
};

router.post('/', optionalProtect, createDonation);
router.get('/', protect, authorizeRoles('admin'), getDonations);

export default router;
