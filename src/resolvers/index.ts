import { mergeResolvers } from "@graphql-tools/merge";
import { articleResolvers } from "./articles";

export const resolvers = mergeResolvers([articleResolvers]);
