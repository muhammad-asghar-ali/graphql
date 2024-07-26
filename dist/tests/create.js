"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const testArticle = {
    title: "Test Article",
    description: "This is a test article",
};
config_1.db.collection("articles")
    .save(testArticle)
    .then((meta) => {
    console.log("Test article created with meta:", meta);
})
    .catch((err) => {
    console.error("Error creating test article:", err.message, err.stack);
});
