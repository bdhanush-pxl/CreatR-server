import express from 'express';
import upload from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createPost, getUserDraft, updatePost } from '../controllers/post.controller.js';

const postRoutes = express.Router();

postRoutes.route("/draft").get(
    verifyJWT,
    getUserDraft
);

postRoutes.route("/create").post(
    verifyJWT,
    upload,
    createPost
);

postRoutes.route("/update").put(
    verifyJWT,
    upload,
    updatePost
);

export default postRoutes;