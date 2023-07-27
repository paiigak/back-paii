export interface ICreateComment {
  contentId: number;
  userId: string;
  foundPlace: string;
  foundDatetime: Date;
  foundDetail: string;
  img: string | null; // not sure have to do string[] --> if need how syntax in repo
}

export interface IComment extends ICreateComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isArchive: boolean;
}

export interface IUpdateIsArchiveComment {
  isArchive: boolean;
}

export interface WithCreateComment {
  foundPlace: string;
  foundDatetime: Date;
  foundDetail: string;
  img: string;
  isArchive: boolean;
  contentId: number;
  userId: string;
}

export interface WithCommentId {
  id: string;
}

export interface WithComment extends WithCreateComment {
  createdAt: Date;
  updatedAt: Date;
}

export interface WithIsArchiveComment {
  userId: string;
  contentId: number;
  isArchive: boolean;
}
