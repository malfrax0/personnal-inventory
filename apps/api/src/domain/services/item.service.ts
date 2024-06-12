import { Prisma } from "@prisma/client";
import itemRepository from "../../infrastructure/repositories/item.repository";
import { SearchInput, searchInputToPrisma } from "../utils/search";

const getItem = async (id: string) => {
    const item = itemRepository.findItemById(id);
    if (!item) {
        throw new Error(`Item with id ${id} not found`);
    }
    return item;
}

const getItems = async (input: SearchInput<Prisma.ItemGetPayload<true>>) => {
    return itemRepository.findManyItems(searchInputToPrisma<Prisma.ItemWhereInput>(input), input.skip, input.take);
}

type CreateItemInput = {
    title: string;
    description: string;
    emplacementId: string;
    tags?: string[];
}

const createItem = async (input: CreateItemInput) => {
    const item = await itemRepository.createItem({
        title: input.title,
        description: input.description,
        emplacement: { connect: { id: input.emplacementId } },
        tags: input.tags ? { set: input.tags } : undefined
    });
    if (!item) {
        throw new Error("Item could not be created");
    }
    return item;
}

const updateItem = async (id: string, input: Partial<CreateItemInput>) => {
    const item = itemRepository.findItemById(id);
    if (!item) {
        throw new Error(`Item with id ${id} not found`);
    }
    itemRepository.updateItem(id, {
        title: input.title,
        description: input.description,
        emplacement: input.emplacementId ? { connect: { id: input.emplacementId } } : undefined,
        tags: input.tags ? { set: input.tags } : undefined
    });
    return item;
}

const deleteItem = async (id: string) => {
    const item = itemRepository.findItemById(id);
    if (!item) {
        throw new Error(`Item with id ${id} not found`);
    }
    itemRepository.deleteItem(id);
    return item;
}

export default {
    getItem,
    getItems,
    createItem,
    updateItem,
    deleteItem
}