import { Request } from "express";

export interface AppRequest<Params, Body> extends Request<Params, any, Body> {}

export interface Empty {}

export const includeUser = {
  user: {
    select: {
      id: true,
      name: true,
      username: true,
      surname: false,
      email: false,
      phoneNumber: false,
      address: false,
      province: false,
      postcode: false,
      password: false,
      registeredAt: false,
      updatedAt: false,
    },
  },
};
