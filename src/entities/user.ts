import { Province } from "@prisma/client";

export interface ICreateUser {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  address: string;
  province: Province;
  postcode: string;
}

export interface IUser extends ICreateUser {
  id: string;
  password: string;
  registeredAt: Date;
  updatedAt: Date;
}
