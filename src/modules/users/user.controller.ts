import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";

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
export const userController = { createUser };
