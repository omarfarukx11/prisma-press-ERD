import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";


const createComment = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})
const getAllComments = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})
const getSingleComment = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})
const updateComment = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})
const updateCommentByAdmin = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})
const deleteComment = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})

export const commentController = {
    createComment,
    getAllComments,
    getSingleComment,
    updateComment,
    updateCommentByAdmin,
    deleteComment
}