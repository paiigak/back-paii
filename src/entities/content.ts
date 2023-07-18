import { Gender, Nationality, Province, Skin, Status } from "@prisma/client";

export interface ICreateContent {
  userId: string;
  name: string;
  surname: string;
  nickname: string;
  img: string | null; // not sure have to do string[] --> if need how syntax in repo
  nationality: Nationality;
  ageLastSeen: number;
  gender: Gender;
  weight: number;
  height: number;
  skin: Skin;
  remark: string;
  province: Province;
  place: string;
  missingDatetime: Date;
  missingDetail: string;
  dateOfBirth: Date;
}

export interface IContent extends ICreateContent {
  id: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  isArchive: boolean;
}

export interface IDeleteContent {
  status: Status;
  isArchive: boolean;
}
