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


const handleCheckout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const event = req.body; 
  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).send("Missing stripe signature");
  }

  try {
    await subscriptionServices.handleWebhook(event, signature as string);
    
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Webhook triggered successfully",
      data: null
    });
  } catch (error: any) {
    console.error(" Webhook Error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

export const subscriptionController = {
    createCheckoutSession,
    handleCheckout
}