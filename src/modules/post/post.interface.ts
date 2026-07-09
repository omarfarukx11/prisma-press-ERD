import { PostStatus } from "../../../generated/prisma/enums"
import { PostWhereInput } from "../../../generated/prisma/models"

export interface ICreatePostPayload {
    title : string,
    content : string,
    thumbnail? : string,
    isFeatured : boolean,
    status? : PostStatus,
    tags : string[]
}

export interface IUpdatePayload {
    title? : string,
    content? : string,
    thumbnail? : string,
    isFeatured? : boolean,
    status? : PostStatus,
    tags? : string[]
}

export interface IQuery extends PostWhereInput {
    searchTerm ? : string,
    page ? : string,
    limit ? : string,
    sortOrder ? : string,
    sortBy ? : string
}