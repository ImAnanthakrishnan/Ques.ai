import express from 'express';
import { createProject, getProject } from '../../controllers/features/projectController.js';
import { authenticate } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
.post(authenticate,createProject)
.get(authenticate,getProject);

export default router;