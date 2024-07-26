export interface CollectionIndex {
  type: string; // e.g., "persistent"
  fields: string[];
  unique?: boolean;
}

export interface CollectionConfig {
  name: string;
  indexes: CollectionIndex[];
}

export const collectionsConfig: CollectionConfig[] = [
  {
    name: "articles",
    indexes: [
      { type: "persistent", fields: ["title"], unique: false },
      { type: "persistent", fields: ["description"], unique: false },
    ],
  },
  //   {
  //     name: "users",
  //     indexes: [
  //       { type: "persistent", fields: ["username"], unique: true },
  //       { type: "persistent", fields: ["email"], unique: true },
  //     ],
  //   },
  // Add more collections and their indexes here
];
