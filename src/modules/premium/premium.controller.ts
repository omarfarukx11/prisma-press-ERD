import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import HttpStatus from "http-status";
import { premiumService } from "./premium.service";

const getPrimiumContent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await premiumService.getPrimiumContent(query);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Permium content retrive successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

export const premiumController = {
  getPrimiumContent,
};
