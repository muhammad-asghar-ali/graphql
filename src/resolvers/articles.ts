import { Article, ArticleModel } from "../models";

export const articleResolver = {
  Query: {
    async articles() {
      try {
        const cursor = await ArticleModel.all();
        const articles = await cursor.all();
        return articles;
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw new Error("Error fetching articles");
      }
    },
    async article(_: any, { _key }: { _key: string }) {
      try {
        const article = await ArticleModel.document(_key);
        return article;
      } catch (error) {
        console.error("Error fetching article:", error);
        throw new Error("Error fetching article");
      }
    },
  },

  Mutation: {
    async createArticle(_: any, { article }: { article: Article }) {
      try {
        const meta = await ArticleModel.save(article);
        return { ...article, _key: meta._key };
      } catch (error) {
        console.error("Error creating article:", error);
        throw new Error("Error creating article");
      }
    },
    async updateArticle(
      _: any,
      { _key, article }: { _key: string; article: Article }
    ) {
      try {
        await ArticleModel.update(_key, article);
        const updatedArticle = await ArticleModel.document(_key);
        return updatedArticle;
      } catch (error) {
        console.error("Error updating article:", error);
        throw new Error("Error updating article");
      }
    },
    async deleteArticle(_: any, { _key }: { _key: string }) {
      try {
        await ArticleModel.remove(_key);
        return `Article with key ${_key} deleted`;
      } catch (error) {
        console.error("Error deleting article:", error);
        throw new Error("Error deleting article");
      }
    },
  },
};
