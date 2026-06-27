import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router()
router.post("/" , auth(Role.ADMIN , Role.AUTHOR , Role.USER), commentController.createComment)

router.get("/author/:authorId" , commentController.getAllComments)
router.get("/comments/:commentId" , commentController.getSingleComment)
router.patch("/comments/:commentId" , auth(Role.ADMIN , Role.AUTHOR , Role.USER) , commentController.updateComment)
router.patch("/comments/:commentId/moderate" , auth(Role.ADMIN) , commentController.updateCommentByAdmin)
router.delete("/comments/:commentId" , auth(Role.ADMIN , Role.AUTHOR , Role.USER) , commentController.deleteComment)


export const commentRouter = router