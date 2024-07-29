import { ArticleModel } from "../../models";

export const articleQuery = {
  Query: {
    /**
     * get all articles
     * @returns
     */
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

    /**
     * get article by key
     * @param _
     * @param param1
     * @returns
     */
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
};
