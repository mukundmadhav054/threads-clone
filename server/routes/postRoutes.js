import express from "express"
import { createPost, deletePost, getPost, likeUnlikePost, replyToPost, getFeedPosts } from "../controllers/postController.js"
import protectRoute from "../middlewares/protectRoute.js"
const router = express.Router()

router.get("/feed", protectRoute, getFeedPosts)
router.get("/:postId", getPost)
router.post("/create", protectRoute, createPost)
router.delete("/:postId", protectRoute, deletePost)
router.put("/like/:postId", protectRoute, likeUnlikePost)
router.put("/reply/:postId", protectRoute, replyToPost)

export default router