import { mergeResolvers } from "@graphql-tools/merge";
import { articleMutation } from "./articles.mutation";
import { articleQuery } from "./articles.query";

export const articleResolvers = mergeResolvers([articleMutation, articleQuery]);
