import { DocumentCollection } from "arangojs/collection";
import { db } from "../config";

export interface User {
  _id?: string;
  _key?: string;
  name: string;
  email: string;
  password: string;
}

export const ArticleModel: DocumentCollection<User> = db.collection("users");
