import { PrismaClient } from "@prisma/client";
import express from "express";
import { newRepositoryContent } from "./repositories/content";
import { newHandlerContent } from "./handlers/content";
import { newRepositoryComment } from "./repositories/comment";
import { newHandlerComment } from "./handlers/comment";
import { newRepositoryUser } from "./repositories/user";
import { newRepositoryBlacklist } from "./repositories/blacklist";
import { newHandlerUser } from "./handlers/user";
import { newMiddlewareHandler } from "./auth/jwt";
import { createClient } from "redis";

const port = Number(process.env.PORT) || 8000;

async function main() {
  const db = new PrismaClient();
  const redis = createClient<any, any, any>();

  try {
    await redis.connect();
    await db.$connect();
  } catch (err) {
    console.log(err);
    return;
  }

  const repoUser = newRepositoryUser(db);
  const repoBlacklist = newRepositoryBlacklist(redis);
  const handlerUser = newHandlerUser(repoUser, repoBlacklist);

  const repoContent = newRepositoryContent(db);
  const handlerContent = newHandlerContent(repoContent);

  const middleware = newMiddlewareHandler(repoBlacklist);

  const repoComment = newRepositoryComment(db);
  const handlerComment = newHandlerComment(repoComment);

  const server = express();
  const userRouter = express.Router();
  const contentRouter = express.Router();
  const commentRouter = express.Router();

  var cors = require("cors");
  server.use(cors());

  server.use(express.json());
  server.use("/user", userRouter);
  server.use("/content", contentRouter);
  server.use("/comment", commentRouter);

  server.get("/", (_, res) => res.status(200).json({ status: "ok" }).end());

  //User API
  userRouter.post("/register", handlerUser.register.bind(handlerUser));
  userRouter.post("/login", handlerUser.login.bind(handlerUser));
  userRouter.get(
    "/me",
    middleware.jwtMiddleware.bind(middleware),
    handlerUser.login.bind(handlerUser)
  );
  userRouter.post(
    "/logout",
    middleware.jwtMiddleware.bind(middleware),
    handlerUser.logout.bind(handlerUser)
  );

  //Content API
  contentRouter.post(
    "/create",
    middleware.jwtMiddleware.bind(middleware),
    handlerContent.createUserContent.bind(handlerContent)
  );
  contentRouter.get("/", handlerContent.getContents.bind(handlerContent));
  contentRouter.get("/:id", handlerContent.getContentById.bind(handlerContent));
  contentRouter.patch(
    "/edit/:id",
    middleware.jwtMiddleware.bind(middleware),
    handlerContent.updateUserContent.bind(handlerContent)
  );
  contentRouter.patch(
    "/editarchive/:id",
    middleware.jwtMiddleware.bind(middleware),
    handlerContent.updateUserIsArchiveContent.bind(handlerContent)
  );

  //Comment API
  commentRouter.post(
    "/create",
    middleware.jwtMiddleware.bind(middleware),
    handlerComment.createUserComment.bind(handlerComment)
  );
  commentRouter.patch(
    "/edit/:id",
    middleware.jwtMiddleware.bind(middleware),
    handlerComment.updateUserComment.bind(handlerComment)
  );
  commentRouter.patch(
    "/editarchive/:id",
    middleware.jwtMiddleware.bind(middleware),
    handlerComment.updateUserIsArchiveComment.bind(handlerComment)
  );

  server.listen(port, () => console.log(`server listening on ${port}`));
}

main();
