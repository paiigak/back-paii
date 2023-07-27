import { Response } from "express";
import { IRepositoryBlacklist, IRepositoryUser } from "../repositories";
import { IHandlerUser } from ".";
import { JwtAuthRequest, Payload, newJwt } from "../auth/jwt";
import { compareHash, hashPassword } from "../auth/bcrype";
import { AppRequest, Empty } from "../entities/indes";
import { WithUser } from "../entities/user";

export function newHandlerUser(
  repo: IRepositoryUser,
  repoBlacklist: IRepositoryBlacklist
): IHandlerUser {
  return new HandlerUser(repo, repoBlacklist);
}
class HandlerUser implements IHandlerUser {
  private repo: IRepositoryUser;
  private repoBlacklist: IRepositoryBlacklist;

  constructor(repo: IRepositoryUser, repoBlacklist: IRepositoryBlacklist) {
    this.repo = repo;
    this.repoBlacklist = repoBlacklist;
  }

  async register(
    req: AppRequest<Empty, WithUser>,
    res: Response
  ): Promise<Response> {
    const {
      username,
      password,
      name,
      surname,
      email,
      phoneNumber,
      address,
      province,
      postcode,
    } = req.body;

    if (
      !username ||
      !password ||
      !name ||
      !surname ||
      !email ||
      !phoneNumber ||
      !address ||
      !province ||
      !postcode
    ) {
      return res.status(400).json({ error: "missing information" }).end();
    }

    return this.repo
      .createUser({
        username,
        name,
        surname,
        email,
        phoneNumber,
        address,
        province,
        postcode,
        password: hashPassword(password),
      })
      .then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ error: `no such user: ${username}` })
            .end();
        }
        return res
          .status(200)
          .json({ ...user, password: undefined })
          .end();
      })
      .catch((err) => {
        const errMsg = `failed to create user ${username}`;
        console.error(`${errMsg}: ${err}`);
        return res.status(500).json({ error: errMsg }).end();
      });
  }

  async login(
    req: AppRequest<Empty, WithUser>,
    res: Response
  ): Promise<Response> {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "missing username or password" })
        .end();
    }
    return this.repo
      .getUser(username)
      .then((user) => {
        if (!compareHash(password, user.password)) {
          return res
            .status(401)
            .json({ error: "invalid password", statusCode: 401 })
            .end();
        }

        const payload: Payload = { id: user.id, username: user.username };
        const accessToken = newJwt(payload);

        return res
          .status(201)
          .json({
            accessToken,
          })
          .end();
      })
      .catch((err) => {
        console.error(`failed to get user: ${err}`);
        return res
          .status(500)
          .json({ error: `failed to get user: ${err}` })
          .end();
      });
  }

  async logout(
    req: JwtAuthRequest<Empty, Empty>,
    res: Response
  ): Promise<Response> {
    return this.repoBlacklist
      .addToBlacklist(req.token)
      .then(() =>
        res.status(200).json({ status: `Logged out`, token: req.token }).end()
      )
      .catch((err) => {
        return res
          .status(500)
          .json({ error: `could not log out with token ${req.token}` })
          .end();
      });
  }
}
