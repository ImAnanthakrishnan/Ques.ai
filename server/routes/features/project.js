import express from 'express';
import { createProject, getProject } from '../../controllers/features/projectController.js';

const router = express.Router();

router.route('/')
.post(createProject)
.get(getProject);

export default router;