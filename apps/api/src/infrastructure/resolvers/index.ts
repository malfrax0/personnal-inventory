import { mergeResolvers } from "@graphql-tools/merge";
import health from "./health.resolver";
import emplacement from "./emplacement.resolver";
import item from "./item.resolver";

export const getResolvers = () => {
    return mergeResolvers([
        health,
        emplacement,
        item
    ])
}

export default getResolvers;