import { Response } from "express";

import { IRepositoryComment } from "../repositories";
import { JwtAuthRequest } from "../auth/jwt";
import { Empty } from "../entities/indes";
import {
  WithComment,
  WithCommentId,
  WithCreateComment,
  WithIsArchiveComment,
} from "../entities/comment";

export function newHandlerComment(repo: IRepositoryComment) {
  return new HandlerComment(repo);
}

class HandlerComment {
  private readonly repo: IRepositoryComment;
  constructor(repo: IRepositoryComment) {
    this.repo = repo;
  }

  // create comment
  async createUserComment(
    req: JwtAuthRequest<Empty, WithCreateComment>,
    res: Response
  ): Promise<Response> {
    const { contentId, userId, foundPlace, foundDatetime, foundDetail, img } =
      req.body;
    if (
      !contentId ||
      !userId ||
      !foundPlace ||
      !foundDatetime ||
      !foundDetail ||
      !img
    ) {
      return res.status(400).json({ error: "missing something in body" }).end();
    }
    return await this.repo
      .createUserComment({
        contentId,
        userId: req.payload.id,
        foundPlace,
        foundDatetime,
        foundDetail,
        img,
      })
      .then((comment) => res.status(200).json(comment).end())
      .catch((err) => {
        const errMsg = "failed to create comment";
        console.error(`${errMsg}: ${err}`);
        return res
          .status(500)
          .json({ error: `${errMsg}` })
          .end();
      });
  }
  // get comment by id and can edit it
  async updateUserComment(
    // waiting for jwt and type
    req: JwtAuthRequest<WithCommentId, WithComment>,
    res: Response
  ): Promise<Response> {
    const {
      contentId,
      userId,
      foundPlace,
      foundDatetime,
      foundDetail,
      img,
      createdAt,
      updatedAt,
      isArchive,
    } = req.body;
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "missing id in params" }).end();
    }
    if (isNaN(id)) {
      return res.status(400).json({ error: `id ${id} is not a number` });
    }
    if (
      !contentId ||
      !userId ||
      !foundPlace ||
      !foundDatetime ||
      !foundDetail ||
      !img ||
      !createdAt ||
      !updatedAt ||
      !isArchive
    ) {
      return res.status(400).json({ error: "missing something in body" }).end();
    }

    //  curious? have to Use undefined to skip field when updating?
    return await this.repo
      .updateUserComment({
        id,
        contentId,
        userId: req.payload.id,
        foundPlace,
        foundDatetime,
        foundDetail,
        img,
        createdAt,
        updatedAt,
        isArchive,
      })
      .then((updated) => res.status(200).json(updated).end())
      .catch((err) => {
        const errMsg = `failed to update content ${id}`;
        console.error(`${errMsg}: ${err}`);
        return res
          .status(500)
          .json({ error: `${errMsg}` })
          .end();
      });
  }

  // update isArchivecomment
  async updateUserIsArchiveComment(
    req: JwtAuthRequest<WithCommentId, WithIsArchiveComment>,
    res: Response
  ): Promise<Response> {
    const { userId, isArchive } = req.body;
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "missing id in params" }).end();
    }
    if (isNaN(id)) {
      return res.status(400).json({ error: `id ${id} is not a number` });
    }
    if (!userId || !isArchive) {
      return res.status(400).json({ error: "missing something in body" }).end();
    }

    //  curious? have to Use undefined to skip field when updating?
    return await this.repo
      .updateUserIsArchiveComment({ id, userId: req.payload.id, isArchive })
      .then((deleted) => res.status(200).json(deleted).end())
      .catch((err) => {
        const errMsg = `failed to delete content ${id}`;
        console.error(`${errMsg}: ${err}`);
        return res
          .status(500)
          .json({ error: `${errMsg}` })
          .end();
      });
  }
}
