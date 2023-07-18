import { Request, Response } from "express";

import { IRepositoryComment } from "../repositories";

export function newHandlerComment(repo: IRepositoryComment) {
  return new HandlerComment(repo);
}

class HandlerComment {
  private readonly repo: IRepositoryComment;
  constructor(repo: IRepositoryComment) {
    this.repo = repo;
  }

  // get all comments

  async getComments(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response> {
    return this.repo
      .getComments()
      .then((comments) => res.status(200).json(comments).end())
      .catch((err) => {
        const errMsg = `failed to get all comment`;
        console.error(`${errMsg}: ${err}`);
        return res
          .status(500)
          .json({ error: `${errMsg}` })
          .end();
      });
  }
  // create comment
  async createUserComment(
    // waiting for jwt and type
    req: Request,
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
    // waiting for payload
    // const userId = req.payload.id
    return await this.repo
      .createUserComment({
        contentId,
        userId,
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
    req: Request,
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
    // waiting for payload
    // const userId = req.payload.id

    //  curious? have to Use undefined to skip field when updating?
    return await this.repo
      .updateUserComment({
        id,
        contentId,
        userId,
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

  // delete comment
  async deleteUserComment(
    // waiting for jwt and type
    req: Request,
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

    // waiting for payload
    // const userId = req.payload.id

    //  curious? have to Use undefined to skip field when updating?
    return await this.repo
      .deleteUserComment({ id, userId, isArchive })
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
