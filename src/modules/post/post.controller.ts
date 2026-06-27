import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";


const createPost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    
})


const getAllPost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
})

const getStats = catchAsync(async () => {
  
})


const getMyPost = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  

})

const getPostById = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
  
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