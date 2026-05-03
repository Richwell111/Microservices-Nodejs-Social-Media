import express from "express";
<<<<<<< HEAD
import { authenticateRequest } from "../middleware/authMiddleware.js";
=======
import { authenticateRequest } from "../middleware/auth.js";
>>>>>>> 452b70bc9fdd1bb39e19c04a001b1a1adbc18377
import {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
} from "../controllers/post-controller.js";

const router = express();

//middleware -> this will tell if the user is an auth user or not
router.use(authenticateRequest);

router.post("/create-post", createPost);
router.get("/all-posts", getAllPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

export default router;
