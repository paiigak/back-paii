export interface ICreateContent {
  userId: string;
  name: string;
  surname: string;
  nickname: string;
  img: string | null; // not sure have to do string[] --> if need how syntax in repo
  nationality: string;
  ageLastSeen: number;
  gender: string;
  weight: number;
  height: number;
  skin: string;
  remark: string;
  province: string;
  place: string;
  missingDatetime: Date;
  missingDetail: string;
  dateOfBirth: Date;
  status: string;
}

export interface IContent extends ICreateContent {
  id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isArchive: boolean;
}

export interface IUpdateIsArchiveContent {
  status: string;
  isArchive: boolean;
}

export interface WithCreateContent {
  userId: string;
  isArchive: boolean;
  name: string;
  surname: string;
  nickname: string;
  img: string;
  nationality: string;
  ageLastSeen: number;
  dateOfBirth: Date;
  gender: string;
  weight: number;
  height: number;
  skin: string;
  remark: string;
  status: string;
  province: string;
  place: string;
  missingDatetime: Date;
  missingDetail: string;
}

export interface WithContentId {
  id: string;
}

export interface WithContent extends WithCreateContent {
  createdAt: Date;
  updatedAt: Date;
}

export interface WithIsArchiveContent {
  userId: string;
  isArchive: boolean;
  status: string;
}
