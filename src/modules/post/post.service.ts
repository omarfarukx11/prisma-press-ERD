import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IUpdatePayload } from "./post.interface";

const createPostInDB = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};

const getAllPostFromDB = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
    orderBy : {
      createdAt : "desc"
    }
  });
  return result;
};

const getSinglePostFromDB = async (postId: string) => {
  const updatePost = await prisma.post.update({
    where: { id: postId },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return updatePost;
};

const getMyPostFromDB = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: { authorId: authorId },
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      author: {
        omit: { password: true },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return result;
};


const updatePostInDB = async (
  postId: string,
  payload: IUpdatePayload,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not eligable to update this post");
  }

  const result = await prisma.post.update({
    where: { id: postId },
    data: payload,
    include: {
      comments: true,
      author: {
        omit: { password: true },
      },
    },
  });
  return result;
};

const deletePostFromDB = async (postId : string ,authorId : string, isAdmin : boolean) => {
  const post = await prisma.post.findFirstOrThrow({
    where : { id : postId}
  })
  if(!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not eligable to Deletite this post");
  }

  const result =  await prisma.post.delete({
    where : {id : postId}
  })

  return null;
};

const getStatsFromDB = async () => {};



export const postService = {
  createPostInDB,
  getAllPostFromDB,
  getStatsFromDB,
  getMyPostFromDB,
  getSinglePostFromDB,
  updatePostInDB,
  deletePostFromDB,
};
