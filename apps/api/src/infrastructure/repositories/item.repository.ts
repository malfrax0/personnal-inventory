import { Prisma } from "@prisma/client";
import Item from "../../domain/entities/item.entity";
import prisma from "../prisma";


export const findItemById = async (id: string): Promise<Item | null> => {
    const item = await prisma.item.findUnique({
        where: { id },
        include: {
            emplacement: true
        }
    });
    return item ? Item.fromPrisma(item) : null;
}

export const findAllItems = async (itemWhere: Prisma.ItemWhereInput): Promise<Item[]> => {
    const items = await prisma.item.findMany({
        include: {
            emplacement: true
        },
        where: itemWhere
    });
    return items.map(item => Item.fromPrisma(item));
}

export const createItem = async (createInput: Prisma.ItemCreateInput): Promise<Item> => {
    const createdItem = await prisma.item.create({
        data: createInput
    });
    return Item.fromPrisma(createdItem);
}

export const updateItem = async (id: string, updateInput: Prisma.ItemUpdateInput): Promise<Item | null> => {
    const updatedItem = await prisma.item.update({
        where: { id },
        data: updateInput,
        include: {
            emplacement: true
        }
    });
    return updatedItem ? Item.fromPrisma(updatedItem) : null;
}

export const deleteItem = async (id: string): Promise<Item | null> => {
    const deletedItem = await prisma.item.delete({
        where: { id },
        include: {
            emplacement: true
        }
    });
    return deletedItem ? Item.fromPrisma(deletedItem) : null;
}

export default {
    findItemById,
    findAllItems,
    createItem,
    updateItem,
    deleteItem
}