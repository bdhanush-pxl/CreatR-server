import express from 'express';
import upload from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

import {generateBlogContent,improveContent} from '../controllers/ai.controller.js';

const aiRoutes = express.Router();

aiRoutes.route("/generate-blog").post(
    verifyJWT,
    generateBlogContent
);

aiRoutes.route("/improve-content").post(
    verifyJWT,
    improveContent
);

export default aiRoutes;