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

const getMyPost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const authorId = req.user?.id;
    const result = await postService.getMyPostFromDB(authorId as string)
    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "My Post Retrive Successfully",
        data : result
    })

})


const updatePost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const postId = req.params.postId;
    const authorId = req.user?.id; 
    const payload = req.body


    const result = await postService.updatePostInDB(postId as string , payload , authorId as string )
    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post Updated Successfully",
        data : result
    })
    
})


const deletePost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const postId = req.params.postId;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    await postService.deletePostFromDB(postId as string , authorId as string, isAdmin)
    sendResponse(res , {
        success : true ,
        statusCode : httpStatus.OK,
        message : "Post Deleted Successfully",
        data : null
    })
    
})


const getStats = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await postService.getStatsFromDB()
    sendResponse(res , {
        success : true,
        statusCode : httpStatus.OK,
        message : "Stats Retrive Successfully",
        data : result
    })
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