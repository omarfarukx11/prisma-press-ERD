import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { catchAsync } from "../../utility/catchAsync";
import { jwtUtilis } from "../../utility/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middlewares/auth";

const router = Router();
router.post("/register",userController.createUser);
router.get("/me", auth(Role.AUTHOR,Role.USER) ,  userController.getMyProfile)


export const userRouter = router;