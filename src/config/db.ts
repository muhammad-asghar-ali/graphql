import { Database } from "arangojs";
import { CollectionConfig, collectionsConfig } from "./collections-config";

const dbUrl = process.env.ARANGO_DB_URL;
const dbName = process.env.ARANGO_DB_NAME;
const dbUser = process.env.ARANGO_DB_USER;
const dbPassword = process.env.ARANGO_DB_PASSWORD;

console.log(`Connecting to ArangoDB at ${dbUrl}`);

const db = new Database({
  url: dbUrl,
  databaseName: dbName,
});

db.useBasicAuth(dbUser, dbPassword);

const initializeCollection = async (collectionConfig: CollectionConfig) => {
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
  } else {
    console.log(`Collection '${collectionConfig.name}' already exists.`);
  }
};

const initializeDatabase = async () => {
  try {
    const dbExists = await db.exists();
    if (dbExists) {
      console.log(`Connected to database: ${dbName}`);

      for (const collectionConfig of collectionsConfig) {
        await initializeCollection(collectionConfig);
      }
    } else {
      console.error(`Database ${dbName} does not exist`);
    }
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
};

initializeDatabase();

export { db };
