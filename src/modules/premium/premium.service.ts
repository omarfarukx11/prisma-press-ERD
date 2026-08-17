import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IQuery } from "../post/post.interface";

const getPrimiumContent = async (query: IQuery) => {
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

  andCondtion.push({
    isPremium : true,
  })

  const posts = await prisma.post.findMany({
    where: {
      AND : andCondtion
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
  const totalPostCount = await prisma.post.count({
    where : {
      AND : andCondtion
    }
  })
  return {
    data : posts,
    meta : {
      page : page,
      limit : limit,
      total : totalPostCount,
      totalPage : Math.ceil(totalPostCount / limit)
    }
  };
};

export const premiumService = {
  getPrimiumContent,
};
