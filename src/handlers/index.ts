import { Response } from "express";
import { JwtAuthRequest } from "../auth/jwt";
import { AppRequest, Empty } from "../entities/indes";
import { WithUser } from "../entities/user";
import {
  WithContent,
  WithContentId,
  WithCreateContent,
} from "../entities/content";
import {
  WithComment,
  WithCommentId,
  WithCreateComment,
  WithIsArchiveComment,
} from "../entities/comment";

export interface IHandlerUser {
  register(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  login(req: AppRequest<Empty, WithUser>, res: Response): Promise<Response>;
  logout(req: JwtAuthRequest<Empty, Empty>, res: Response): Promise<Response>;
}

export interface IHandlerContent {
  getContents(
    req: JwtAuthRequest<Empty, Empty>,
    res: Response
  ): Promise<Response>;
  createUserContent(
    req: JwtAuthRequest<Empty, WithCreateContent>,
    res: Response
  ): Promise<Response>;
  getContentById(
    req: JwtAuthRequest<WithContentId, Empty>,
    res: Response
  ): Promise<Response>;
  updateUserContent(
    req: JwtAuthRequest<WithContentId, WithContent>,
    res: Response
  ): Promise<Response>;
}

export interface IHandlerComment {
  createUserComment(
    req: JwtAuthRequest<Empty, WithCreateComment>,
    res: Response
  ): Promise<Response>;
  updateUserComment(
    // waiting for jwt and type
    req: JwtAuthRequest<WithCommentId, WithComment>,
    res: Response
  ): Promise<Response>;
  updateUserIsArchiveComment(
    req: JwtAuthRequest<WithCommentId, WithIsArchiveComment>,
    res: Response
  ): Promise<Response>;
}
