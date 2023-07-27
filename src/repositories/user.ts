import { PrismaClient } from "@prisma/client";
import { IRepositoryUser } from ".";
import { ICreateUser, IUser } from "../entities/user";

export function newRepositoryUser(db: PrismaClient): IRepositoryUser {
  return new RepositoryUser(db);
}

class RepositoryUser implements IRepositoryUser {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async createUser(user: ICreateUser): Promise<IUser> {
    return await this.db.user
      .create({
        data: {
          username: user.username,
          password: user.password,
          name: user.name,
          surname: user.surname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          province: user.province,
          postcode: user.postcode,
        },
      })
      .catch((err) =>
        Promise.reject(`failed to create user ${user.username}: ${err}`)
      );
  }

  async getUser(username: string): Promise<IUser> {
    return await this.db.user
      .findUnique({ where: { username } })
      .then((user) => {
        if (!user) {
          return Promise.reject(`no such user ${username}`);
        }
        return Promise.resolve(user);
      })
      .catch((err) => Promise.reject(`failed to get user ${username}: ${err}`));
  }
}
