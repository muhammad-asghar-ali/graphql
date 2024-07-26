"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const arangojs_1 = require("arangojs");
const collections_config_1 = require("./collections-config");
const dbUrl = process.env.ARANGO_DB_URL;
const dbName = process.env.ARANGO_DB_NAME;
const dbUser = process.env.ARANGO_DB_USER;
const dbPassword = process.env.ARANGO_DB_PASSWORD;
console.log(`Connecting to ArangoDB at ${dbUrl}`);
const db = new arangojs_1.Database({
    url: dbUrl,
    databaseName: dbName,
});
exports.db = db;
db.useBasicAuth(dbUser, dbPassword);
const initializeCollection = async (collectionConfig) => {
    const collection = db.collection(collectionConfig.name);
    const collectionExists = await collection.exists();
    if (!collectionExists) {
        await collection.create();
        console.log(`Collection '${collectionConfig.name}' created.`);
        for (const index of collectionConfig.indexes) {
            await collection.ensureIndex({
                type: "persistent",
                fields: index.fields,
                unique: index.unique,
            });
            console.log(`Index on '${index.fields.join(", ")}' created.`);
        }
    }
    else {
        console.log(`Collection '${collectionConfig.name}' already exists.`);
    }
};
const initializeDatabase = async () => {
    try {
        const dbExists = await db.exists();
        if (dbExists) {
            console.log(`Connected to database: ${dbName}`);
            for (const collectionConfig of collections_config_1.collectionsConfig) {
                await initializeCollection(collectionConfig);
            }
        }
        else {
            console.error(`Database ${dbName} does not exist`);
        }
    }
    catch (error) {
        console.error("Error during database initialization:", error);
    }
};
initializeDatabase();
// import { Database } from "arangojs";
// export const config = {
//   url: "http://localhost:8529",
//   database: "_system",
//   username: "root",
//   password: "openSesame",
// };
// console.log(`Connecting to ArangoDB at ${config.url}`);
// const db = new Database({
//   url: config.url,
//   databaseName: config.database,
// });
// db.useBasicAuth(config.username, config.password);
// db.exists()
//   .then((exists) => {
//     if (exists) {
//       console.log(`Connected to database: ${config.database}`);
//     } else {
//       console.error(`Database ${config.database} does not exist`);
//     }
//   })
//   .catch((error) => {
//     console.error("Error checking database existence:", error);
//   });
// export { db };
