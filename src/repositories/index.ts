import {
  IComment,
  ICreateComment,
  IUpdateIsArchiveComment,
} from "../entities/comment";
import {
  IContent,
  ICreateContent,
  IUpdateIsArchiveContent,
} from "../entities/content";
import { ICreateUser, IUser } from "../entities/user";

export interface IRepositoryContent {
  getContents(): Promise<IContent[]>;
  createUserContent(arg: ICreateContent): Promise<IContent>;
  getContentById(id: number): Promise<IContent | null>;
  updateUserContent(arg: IContent): Promise<IContent>;
  updateUserIsArchiveContent(arg: {
    id: number;
    userId: string;
    status: string;
    isArchive: boolean;
  }): Promise<IUpdateIsArchiveContent>;
}

export interface IRepositoryComment {
  createUserComment(arg: ICreateComment): Promise<IComment>;
  updateUserComment(arg: IComment): Promise<IComment>;
  updateUserIsArchiveComment(arg: {
    id: number;
    userId: string;
    isArchive: boolean;
  }): Promise<IUpdateIsArchiveComment>;
}

export interface IRepositoryUser {
  createUser(user: ICreateUser): Promise<IUser>;
  getUser(username: string): Promise<IUser>;
}

export interface IRepositoryBlacklist {
  addToBlacklist(token: string): Promise<void>;
  isBlacklisted(token: string): Promise<boolean>;
}
