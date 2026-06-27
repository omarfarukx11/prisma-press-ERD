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
  const userId = req.user?.id as string
  const profile = await userService.getMyProfileFromDB(userId)
  sendResponse(res , {
    success : true,
    statusCode : httpStatus.OK,
    message : "user profile fetch succesfully",
    data : {profile}
  })
})

const updateProfile = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;
    const updateResult = userService.updateProfileIntoDB(userId , payload)
    sendResponse(res , {
      success : true,
      statusCode : httpStatus.OK,
      message :"user profile updated successfully",
      data : {updateResult}
    })
})

export const userController = { createUser , getMyProfile , updateProfile};
