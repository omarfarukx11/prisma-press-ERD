import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import jwt from "jsonwebtoken"
import config from "../../config";
import { jwtUtilis } from "../../utility/jwt";

const createUser = catchAsync( async (req : Request , res : Response , next : NextFunction) => {
  const payload = req.body;
  const user = await userService.createUserInfoDB(payload)
  sendResponse(res , {
    success : true,
    statusCode : httpStatus.CREATED,
    message : "user register successfully",
    data : {user}
  })
})

const getMyProfile = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
  const profile = await userService.getMyProfileFromDB(req.user?.id as string)
  sendResponse(res , {
    success : true,
    statusCode : httpStatus.OK,
    message : "user profile fetch succesfully",
    data : {profile}
  })
})

export const userController = { createUser , getMyProfile };
