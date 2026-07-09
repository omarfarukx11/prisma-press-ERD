import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { subscriptionServices } from "./subscription.service";
import { sendResponse } from "../../utility/sendResponse";
import  HttpStatus  from "http-status";

const createCheckoutSession = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const userId = req.user?.id;
    const result = await subscriptionServices.createCheckoutSession(userId as string)
    sendResponse(res , {
        success : true,
        statusCode : HttpStatus.OK,
        message : "Checkout completed successfully",
        data : result
    })
})


export const subscriptionController = {
    createCheckoutSession,
}