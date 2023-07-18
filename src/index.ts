import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import express from "express";
import { newRepositoryContent } from "./repositories/content";
import { newHandlerContent } from "./handlers/content";
import { newRepositoryComment } from "./repositories/comment";
import { newHandlerComment } from "./handlers/comment";

async function main() {
  const db = new PrismaClient();
  const redis = createClient({
    url: process.env.REDIS_URL || undefined,
  });

  try {
    redis.connect();
    db.$connect();
  } catch (err) {
    console.error(err);
    return;
  }

  const repoContent = newRepositoryContent(db);
  const repoComment = newRepositoryComment(db);

  const HandlerContent = newHandlerContent(repoContent);
  const HandlerComment = newHandlerComment(repoComment);

  const port = process.env.PORT || 8000;
  const server = express();
  const contentRouter = express.Router();
  const commentRouter = express.Router();

  server.use(express.json());
  server.use("/content", contentRouter);
  server.use("/comment", commentRouter);

  // content API
  contentRouter.get("/", HandlerContent.getContents.bind(HandlerContent));
  // waiting for add JWT middleware
  contentRouter.post(
    "/",
    HandlerContent.createUserContent.bind(HandlerContent)
  );
  contentRouter.get("/:id", HandlerContent.getContentById.bind(HandlerContent));
  // waiting for add JWT middleware
  contentRouter.patch(
    "/:id",
    HandlerContent.updateUserContent.bind(HandlerContent)
  );
  // waiting for add JWT middleware
  contentRouter.delete(
    "/:id",
    HandlerContent.deleteUserContent.bind(HandlerContent)
  );

  // conment API
  commentRouter.get("/", HandlerComment.getComments.bind(HandlerComment));
  // waiting for add JWT middleware
  commentRouter.post(
    "/",
    HandlerComment.createUserComment.bind(HandlerComment)
  );
  // waiting for add JWT middleware
  commentRouter.patch(
    "/:id",
    HandlerComment.updateUserComment.bind(HandlerComment)
  );
  // waiting for add JWT middleware
  commentRouter.delete(
    "/:id",
    HandlerComment.deleteUserComment.bind(HandlerComment)
  );

  server.listen(port, () => console.log(`server listener on ${port}`));
}

main();
