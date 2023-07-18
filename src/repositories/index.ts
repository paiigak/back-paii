import { Status } from "@prisma/client";
import { IComment, ICreateComment, IDeleteComment } from "../entities/comment";
import { IContent, ICreateContent, IDeleteContent } from "../entities/content";

export interface IRepositoryContent {
  getContents(): Promise<IContent[]>;
  createUserContent(arg: ICreateContent): Promise<IContent>;
  getContentById(id: number): Promise<IContent | null>;
  updateUserContent(arg: IContent): Promise<IContent>;
  deleteUserContent(arg: {
    id: number;
    userId: string;
    status: Status;
    isArchive: boolean;
  }): Promise<IDeleteContent>;
}

export interface IRepositoryComment {
  getComments(): Promise<IComment[]>;
  createUserComment(arg: ICreateComment): Promise<IComment>;
  updateUserComment(arg: IComment): Promise<IComment>;
  deleteUserComment(arg: {
    id: number;
    userId: string;
    isArchive: boolean;
  }): Promise<IDeleteComment>;
}
