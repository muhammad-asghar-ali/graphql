import { db } from "../config";

const testArticle = {
  title: "Test Article",
  description: "This is a test article",
};

db.collection("articles")
  .save(testArticle)
  .then((meta) => {
    console.log("Test article created with meta:", meta);
  })
  .catch((err) => {
    console.error("Error creating test article:", err.message, err.stack);
  });
