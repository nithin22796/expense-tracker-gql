import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import trasactionResolver from "./transaction.resolver.js";


const mergedResolvers = mergeResolvers([userResolver, trasactionResolver]);

export default mergedResolvers;