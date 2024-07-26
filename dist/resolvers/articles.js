"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleResolver = void 0;
const models_1 = require("../models");
exports.articleResolver = {
    Query: {
        async articles() {
            try {
                console.log("Fetching all articles");
                const cursor = await models_1.ArticleModel.all();
                const articles = await cursor.all();
                console.log("Fetched articles:", articles);
                return articles;
            }
            catch (error) {
                console.error("Error fetching articles:", error);
                throw new Error("Error fetching articles");
            }
        },
        async article(_, { _key }) {
            try {
                console.log(`Fetching article with key: ${_key}`);
                const article = await models_1.ArticleModel.document(_key);
                console.log("Fetched article:", article);
                return article;
            }
            catch (error) {
                console.error("Error fetching article:", error);
                throw new Error("Error fetching article");
            }
        },
    },
    Mutation: {
        async createArticle(_, { article }) {
            try {
                console.log("Creating article with data:", article);
                const meta = await models_1.ArticleModel.save(article);
                console.log("Article created with meta:", meta);
                return { ...article, _key: meta._key };
            }
            catch (error) {
                console.error("Error creating article:", error);
                throw new Error("Error creating article");
            }
        },
        async updateArticle(_, { _key, article }) {
            try {
                console.log(`Updating article with key: ${_key}`);
                await models_1.ArticleModel.update(_key, article);
                const updatedArticle = await models_1.ArticleModel.document(_key);
                console.log("Updated article:", updatedArticle);
                return updatedArticle;
            }
            catch (error) {
                console.error("Error updating article:", error);
                throw new Error("Error updating article");
            }
        },
        async deleteArticle(_, { _key }) {
            try {
                console.log(`Deleting article with key: ${_key}`);
                await models_1.ArticleModel.remove(_key);
                console.log(`Article with key ${_key} deleted`);
                return `Article with key ${_key} deleted`;
            }
            catch (error) {
                console.error("Error deleting article:", error);
                throw new Error("Error deleting article");
            }
        },
    },
};
