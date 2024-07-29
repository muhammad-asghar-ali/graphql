import { Article, ArticleModel } from "../../models";

export const articleMutation = {
  Mutation: {
    /**
     * create article
     * @param _
     * @param param1
     * @returns
     */
    async createArticle(_: any, { article }: { article: Article }) {
      try {
        const meta = await ArticleModel.save(article);
        return { ...article, _key: meta._key };
      } catch (error) {
        console.error("Error creating article:", error);
        throw new Error("Error creating article");
      }
    },

    /**
     * update article
     * @param _
     * @param param1
     * @returns
     */
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

    /**
     * delete article
     * @param _
     * @param param1
     * @returns
     */
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
