import services from "../../domain/services";

const item = (_, args) => {
    return services.item.getItem(args.id);
}

const items = (_, args) => {
    return services.item.getItems(args.search);
}

const createItem = (_, args) => {
    return services.item.createItem(args.input);
}

const updateItem = (_, args) => { 
    return services.item.updateItem(args.id, args.input);
}

const deleteItem = (_, args) => {
    return services.item.deleteItem(args.id);
}

export default {
    Query: {
        item,
        items
    },
    Mutation: {
        createItem,
        updateItem,
        deleteItem
    }
}