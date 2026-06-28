import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utility/sendResponse";
import httpStatus from "http-status";

const createPost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const  id = req.user?.id;
    const payload = req.body;
    const postResult = await postService.createPostInDB(payload, id as string)
    sendResponse(res , {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "Post Created Successfully",
        data : postResult
    })

})


const getAllPost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  const result = await postService.getAllPostFromDB()
  sendResponse(res , {
    success : true,
    statusCode : httpStatus.OK,
    message : "All Post Retrive successfully",
    data : result
  })
})

const getPostById = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const postId = req.params.postId;
    if(!postId) {
        throw new Error("Post Id Required")
    }
    const result = await postService.getSinglePostFromDB(postId as string)
    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Single Post Retrive successfully",
        data : result
    })
})


const getStats = catchAsync(async () => {
  
})


const getMyPost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  

})


const updatePost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  

})

const deletePost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})




export const postController = {
    createPost,
    getAllPost,
    getStats,
    getMyPost,
    getPostById,
    updatePost,
    deletePost
}