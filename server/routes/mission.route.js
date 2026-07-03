import express from 'express';
import { 
    getMissionVision, 
    createMissionVision, 
    updateMissionVision, 
    deleteMissionVision, 
    setActiveAbout
} from '../controller/mission.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getMissionVision);

router.post('/', protect, upload.single('image'), createMissionVision);
router.put('/:id', protect, upload.single('image'), updateMissionVision);
router.patch('/activate/:id', protect, setActiveAbout);
router.delete('/:id', protect, deleteMissionVision);

export default router;