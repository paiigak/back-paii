export interface IHandlerContent {
  getContents(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
  createUserContent(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
  getContentById(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
  updateUserContent(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
  deleteUserContent(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
}

export interface IHandlerComment {
  getComments(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
  createUserComment(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
  updateUserComment(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
  deleteUserComment(
    // waiting for jwt and type
    req: Request,
    res: Response
  ): Promise<Response>;
}
