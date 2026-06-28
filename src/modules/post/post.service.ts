import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"



const createPostInDB = async (payload : ICreatePostPayload , userId : string) => {
    const result = await prisma.post.create({
        data : {
            ...payload,
            authorId : userId
        }
    })
    return result
}



const getAllPostFromDB = async () => {
  const result = await prisma.post.findMany({
    include : {
        author : true,
        comments : true
    
    }
  })
  return result
}
const getStatsFromDB = async () => {
  
}

const getMyPostFromDB = async () => {
  
}

const getSinglePostFromDB = async () => {
  
}
const updatePostInDB = async () => {
  
}
const deletePostFromDB = async () => {
  
}


export const postService = {
    createPostInDB,
    getAllPostFromDB,
    getStatsFromDB,
    getMyPostFromDB,
    getSinglePostFromDB,
    updatePostInDB,
    deletePostFromDB
}