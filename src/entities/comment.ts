// enum contry {
//   "ไทย" = 1,
//   LAOS = "ลาว",
//   KAMAIR = "เขมร",
// }

// const myCountry = contry["ไทย"];
// const myCountryTest = contry[1];
// console.log(myCountry, myCountryTest);

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

export interface IDeleteComment {
  isArchive: boolean;
}
