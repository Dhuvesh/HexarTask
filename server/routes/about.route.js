import express from 'express';
import { createAbout, deleteAbout, getAbout, setActiveAbout, updateAbout } from '../controller/about.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getAbout);


router.post('/', protect, upload.single('image'), createAbout);
router.put('/:id', protect, upload.single('image'), updateAbout);
router.delete('/:id', protect, deleteAbout);
router.patch('/activate/:id', protect, setActiveAbout);

export default router;