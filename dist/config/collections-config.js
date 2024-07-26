"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsConfig = void 0;
exports.collectionsConfig = [
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
