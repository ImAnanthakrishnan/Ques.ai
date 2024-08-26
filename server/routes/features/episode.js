import express from 'express';
import { createEpisode, deleteEpisode, editEpisode, getEpisode } from '../../controllers/features/episodeController.js';
import { authenticate } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/:projectName')
.post(authenticate,createEpisode)
.get(authenticate,getEpisode)
.patch(authenticate,editEpisode)
.delete(authenticate,deleteEpisode);

export default router;