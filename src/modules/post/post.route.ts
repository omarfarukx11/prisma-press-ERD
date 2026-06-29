import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router()
router.post("/" , auth(Role.ADMIN,Role.AUTHOR,Role.USER) ,postController.createPost)

router.get("/" , postController.getAllPost)
router.get("/stats" , auth(Role.ADMIN) , postController.getStats)
router.get("/my-post" , auth(Role.ADMIN ,Role.AUTHOR, Role.USER) , postController.getMyPost)
router.get("/:postId" , auth(Role.ADMIN ,Role.AUTHOR, Role.USER) , postController.getPostById)
router.patch("/:postId" , auth(Role.ADMIN,Role.AUTHOR) , postController.updatePost)
router.delete("/:postId" , auth(Role.ADMIN,Role.AUTHOR) , postController.deletePost) 


export const postRouter = router