import express from 'express';
import { createBanner, deleteBanner, getBanners, updateBanner } from '../controller/banner.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getBanners);

router.post('/', protect, upload.single('image'), createBanner);
router.put('/:id', protect, upload.single('image'), updateBanner);

router.delete('/:id', protect, deleteBanner);

export default router;