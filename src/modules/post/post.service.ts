import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

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
    where: { authorId : authorId },
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      author: {
        omit: { password: true },
      },
      _count : {
        select : {
            comments : true,
        }
      }
    }
  });
  return result;
};

const getStatsFromDB = async () => {};

const updatePostInDB = async () => {};
const deletePostFromDB = async () => {};

export const postService = {
  createPostInDB,
  getAllPostFromDB,
  getStatsFromDB,
  getMyPostFromDB,
  getSinglePostFromDB,
  updatePostInDB,
  deletePostFromDB,
};
