import express from 'express';
import { createEpisode, getEpisode } from '../../controllers/features/episodeController.js';

const router = express.Router();

router.route('/:projectName')
.post(createEpisode)
.get(getEpisode);

export default router;