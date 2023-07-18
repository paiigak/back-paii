import { PrismaClient, Status } from "@prisma/client";
import { IContent, ICreateContent, IDeleteContent } from "../entities/content";
import { IRepositoryContent } from ".";

export function newRepositoryContent(db: PrismaClient) {
  return new RepositoryContent(db);
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

class RepositoryContent implements IRepositoryContent {
  private readonly db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  // get all case --> list
  async getContents(): Promise<IContent[]> {
    return await this.db.content
      .findMany()
      .catch((err) => Promise.reject(`Failed to get contents: ${err}`));
  }

  // create missingcase ---> case id
  async createUserContent(arg: ICreateContent): Promise<IContent> {
    return await this.db.content
      .create({
        include: includeUser,
        data: {
          // ...arg,
          // userId: undefined,
          // user: {
          //   connect: {
          //     id: arg.userId,
          //   },
          // },
          userId: arg.userId,
          name: arg.name,
          surname: arg.surname,
          nickname: arg.nickname,
          img: arg.img,
          nationality: arg.nationality,
          ageLastSeen: arg.ageLastSeen,
          gender: arg.gender,
          weight: arg.weight,
          height: arg.height,
          skin: arg.skin,
          remark: arg.remark,
          province: arg.province,
          place: arg.place,
          missingDatetime: arg.missingDatetime,
          missingDetail: arg.missingDetail,
          dateOfBirth: arg.dateOfBirth,
        },
      })
      .catch((err) =>
        Promise.reject(`Failed to create Missing Case ${arg.name}: ${err}`)
      );
  }

  // get case by id
  async getContentById(id: number): Promise<IContent | null> {
    return await this.db.content
      .findUnique({
        where: {
          id,
        },
      })
      .catch((err) => Promise.reject(`Fail to get missing case: ${err}`));
  }

  // get case by id and can edit it
  async updateUserContent(arg: IContent): Promise<IContent> {
    const content = await this.db.content.findUnique({
      where: { id: arg.id },
    });
    if (!content) {
      return Promise.reject(`no such content ${arg.id}`);
    }
    if (content.userId !== arg.userId) {
      return Promise.reject(`bad userId: ${arg.userId}`);
    }

    return await this.db.content
      .update({
        where: { id: arg.id },
        include: includeUser,
        data: {
          ...arg,
        },
      })
      .catch((err) => Promise.reject(`Fail to update missing case: ${err}`));
  }

  // delete case by id with acrive
  async deleteUserContent(arg: {
    id: number;
    userId: string;
    status: Status;
    isArchive: boolean;
  }): Promise<IDeleteContent> {
    const content = await this.db.content.findUnique({
      where: { id: arg.id },
    });
    if (!content) {
      return Promise.reject(`no such content ${arg.id}`);
    }
    if (content.userId !== arg.userId) {
      return Promise.reject(`bad userId: ${arg.userId}`);
    }
    return await this.db.content
      .update({
        where: { id: arg.id },
        include: includeUser,
        data: {
          ...arg,
          status: arg.status,
          isArchive: arg.isArchive,
        },
      })
      .catch((err) => Promise.reject(`Fail to delete missing case: ${err}`));
  }
}
