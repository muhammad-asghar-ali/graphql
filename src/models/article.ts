import { DocumentCollection } from "arangojs/collection";
import { db } from "../config";

export interface Article {
  _key?: string;
  title: string;
  description: string;
}

export const ArticleModel: DocumentCollection<Article> =
  db.collection("articles");
