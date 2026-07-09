import { json } from "node:stream/consumers";
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IQuery, IUpdatePayload } from "./post.interface";

const createPostInDB = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};

const getAllPostFromDB = async (query: IQuery) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy;
  const andCondtion: PostWhereInput[] = [];
  const tags = query.tags ? JSON.parse(query.tags as string) : null;
  const tagsArray = Array.isArray(tags) ? tags : [];

  if (query.searchTerm) {
    andCondtion.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }
  if (query.title) {
    andCondtion.push({
      title: query.title,
    });
  }

  if (query.content) {
    andCondtion.push({
      content: query.content,
    });
  }

  if (query.authorId) {
    andCondtion.push({
      authorId: query.authorId,
    });
  }
  if (query.isFeatured) {
    andCondtion.push({
      isFeatured: Boolean(query.isFeatured),
    });
  }

  if (query.tags) {
    andCondtion.push({
      tags: {
        hasSome: tagsArray,
      },
    });
  }

  if (query.status) {
    andCondtion.push({
      status: query.status,
    });
  }

  const result = await prisma.post.findMany({
    where: {
      AND: andCondtion,
    },
    take: limit,
    skip: skip,

    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getSinglePostFromDB = async (postId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const post = await tx.post.findFirstOrThrow({
      where: { id: postId },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        comments: {
          where: {
            status: CommentStatus.APPROVED,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  });
  return transactionResult;
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
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
  });

  if (post.authorId !== authorId) {
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

const deletePostFromDB = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findFirstOrThrow({
    where: { id: postId },
  });
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not eligable to Deletite this post");
  }

  await prisma.post.delete({
    where: { id: postId },
  });
  return null;
};

const getStatsFromDB = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const [
      totalPost,
      totalPublishedPost,
      totalDraftPost,
      totalArchivedPost,
      totalComments,
      totalApprovedComment,
      totalRenectedComment,
      totalPostViewsAggregation,
    ] = await Promise.all([
      await tx.post.count(),
      await tx.post.count({
        where: { status: PostStatus.PUBLISHED },
      }),
      await tx.post.count({
        where: { status: PostStatus.DARFT },
      }),
      await tx.post.count({
        where: { status: PostStatus.ARCHIVED },
      }),
      await tx.comment.count(),
      await tx.comment.count({
        where: { status: CommentStatus.APPROVED },
      }),
      await tx.comment.count({
        where: { status: CommentStatus.REJECT },
      }),
      await tx.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

    return {
      totalPost,
      totalPublishedPost,
      totalDraftPost,
      totalArchivedPost,
      totalComments,
      totalApprovedComment,
      totalRenectedComment,
      totalPostView: totalPostViewsAggregation._sum.views,
    };
  });

  return transactionResult;
};

export const postService = {
  createPostInDB,
  getAllPostFromDB,
  getStatsFromDB,
  getMyPostFromDB,
  getSinglePostFromDB,
  updatePostInDB,
  deletePostFromDB,
};
