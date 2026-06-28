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
        author : {
            omit : {password : true}
        },
        comments : true
    
    }
  })
  return result
}

const getSinglePostFromDB = async (postId : string) => {
   const post = await prisma.post.findUnique({
    where : {id : postId}
   })

   const updatePost = await prisma.post.update({
    where : {id : postId},
    data : {
        views : {
            increment : 1
        },
    },
    include : {
        author : {
            omit : {
                password : true,
            }
        },
        comments : true
    }
   })

   return updatePost
}

const getStatsFromDB = async () => {
}

const getMyPostFromDB = async () => {

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