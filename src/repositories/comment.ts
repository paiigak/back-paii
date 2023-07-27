import { PrismaClient } from "@prisma/client";
import {} from "../entities/content";
import {} from ".";
import {
  IComment,
  ICreateComment,
  IUpdateIsArchiveComment,
} from "../entities/comment";

export function newRepositoryComment(db: PrismaClient) {
  return new RepositoryComment(db);
}

const includeUser = {
  user: {
    select: {
      id: true,
      name: true,
      username: true,
      surname: false,
      email: false,
      phoneNumber: false,
      address: false,
      province: false,
      postcode: false,
      password: false,
      registeredAt: false,
      updatedAt: false,
    },
  },
};

class RepositoryComment {
  private readonly db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  // create comment
  async createUserComment(arg: ICreateComment): Promise<IComment> {
    return await this.db.comment
      .create({
        include: includeUser,
        data: {
          contentId: arg.contentId,
          userId: arg.userId,
          foundPlace: arg.foundPlace,
          foundDatetime: arg.foundDatetime,
          foundDetail: arg.foundDetail,
          img: arg.img,
        },
      })
      .catch((err) => Promise.reject(`Failed to create comment: ${err}`));
  }

  // get comment by id and can edit it
  async updateUserComment(arg: IComment): Promise<IComment> {
    const comment = await this.db.comment.findUnique({
      where: { id: arg.id },
    });
    if (!comment) {
      return Promise.reject(`no such comment ${arg.id}`);
    }
    if (comment.userId !== arg.userId) {
      return Promise.reject(`bad userId: ${arg.userId}`);
    }

    return await this.db.comment
      .update({
        where: { id: arg.id },
        include: includeUser,
        data: {
          ...arg,
        },
      })
      .catch((err) => Promise.reject(`Fail to update comment: ${err}`));
  }

  // update IsArchive comment
  async updateUserIsArchiveComment(arg: {
    id: number;
    userId: string;
    isArchive: boolean;
  }): Promise<IUpdateIsArchiveComment> {
    const comment = await this.db.comment.findUnique({
      where: { id: arg.id },
    });
    if (!comment) {
      return Promise.reject(`no such comment ${arg.id}`);
    }
    if (comment.userId !== arg.userId) {
      return Promise.reject(`bad userId: ${arg.userId}`);
    }

    return await this.db.comment
      .update({
        where: { id: arg.id },
        data: {
          isArchive: arg.isArchive,
        },
      })
      .catch((err) => Promise.reject(`Fail to hide comment: ${err}`));
  }
}
