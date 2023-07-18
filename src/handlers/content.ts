import { Request, Response } from "express";

import { IRepositoryContent } from "../repositories";

export function newHandlerContent(repo: IRepositoryContent) {
  return new HandlerContent(repo);
}

// ? can not implements IHandlerContent
class HandlerContent {
  private readonly repo: IRepositoryContent;
  constructor(repo: IRepositoryContent) {
    this.repo = repo;
  }

  // get all case --> list
  async getContents(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response> {
    return this.repo
      .getContents()
      .then((contents) => res.status(200).json(contents).end())
      .catch((err) => {
        const errMsg = `failed to get all case`;
        console.error(`${errMsg}: ${err}`);
        return res
          .status(500)
          .json({ error: `${errMsg}` })
          .end();
      });
  }

  // create missingcase ---> case id
  async createUserContent(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response> {
    const {
      userId,
      name,
      surname,
      nickname,
      img,
      nationality,
      ageLastSeen,
      gender,
      weight,
      height,
      skin,
      remark,
      province,
      place,
      missingDatetime,
      missingDetail,
      dateOfBirth,
    } = req.body;
    if (
      !userId ||
      !name ||
      !surname ||
      !nickname ||
      !img ||
      !nationality ||
      !ageLastSeen ||
      !gender ||
      !weight ||
      !height ||
      !skin ||
      !remark ||
      !province ||
      !place ||
      !missingDatetime ||
      !missingDetail ||
      !dateOfBirth
    ) {
      return res.status(400).json({ error: "missing something in body" }).end();
    }
    // waiting for payload
    // const userId = req.payload.id
    return await this.repo
      .createUserContent({
        userId,
        name,
        surname,
        nickname,
        img,
        nationality,
        ageLastSeen,
        gender,
        weight,
        height,
        skin,
        remark,
        province,
        place,
        missingDatetime,
        missingDetail,
        dateOfBirth,
      })
      .then((content) => res.status(200).json(content).end())
      .catch((err) => {
        const errMsg = "failed to create content";
        console.error(`${errMsg}: ${err}`);
        return res
          .status(500)
          .json({ error: `${errMsg}` })
          .end();
      });
  }

  // get case by id
  async getContentById(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response> {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "missing id in params" }).end();
    }
    if (isNaN(id)) {
      return res.status(400).json({ error: `id ${id} is not a number` });
    }

    return await this.repo
      .getContentById(id)
      .then((content) => {
        if (!content) {
          return res
            .status(400)
            .json({ error: `no such case: ${id} case` })
            .end();
        }
        return res.status(200).json(content).end();
      })
      .catch((err) => {
        const errMsg = `failed to get case ${id}`;
        console.error(`${errMsg}: ${err}`);
        return res.status(500).json({ error: errMsg }).end();
      });
  }

  // get case by id and can edit it
  async updateUserContent(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response> {
    const {
      userId,
      name,
      surname,
      nickname,
      img,
      nationality,
      ageLastSeen,
      gender,
      weight,
      height,
      skin,
      remark,
      province,
      place,
      missingDatetime,
      missingDetail,
      dateOfBirth,
      status,
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
      !userId ||
      !name ||
      !surname ||
      !nickname ||
      !img ||
      !nationality ||
      !ageLastSeen ||
      !gender ||
      !weight ||
      !height ||
      !skin ||
      !remark ||
      !province ||
      !place ||
      !missingDatetime ||
      !missingDetail ||
      !dateOfBirth ||
      !status ||
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
      .updateUserContent({
        id,
        userId,
        name,
        surname,
        nickname,
        img,
        nationality,
        ageLastSeen,
        gender,
        weight,
        height,
        skin,
        remark,
        province,
        place,
        missingDatetime,
        missingDetail,
        dateOfBirth,
        status,
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
  async deleteUserContent(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response> {
    const {
      userId,
      status,
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
      !userId ||
      !status ||
      !isArchive
    ) {
      return res.status(400).json({ error: "missing something in body" }).end();
    }

    // waiting for payload
    // const userId = req.payload.id

    //  curious? have to Use undefined to skip field when updating?
    return await this.repo
      .deleteUserContent({ id, userId, status, isArchive })
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
