import { Prisma } from "@prisma/client";
import Emplacement from "../../domain/entities/emplacement.entity";
import prisma from "../prisma";


export const findEmplacementById = async (id: string): Promise<Emplacement | null> => {
    const emplacement = await prisma.emplacement.findUnique({
        where: { id },
        include: {
            parent: true,
            children: {
                include: {
                    items: true
                }
            },
            items: true
        }
    });
    return emplacement ? Emplacement.fromPrisma(emplacement) : null;
}

export const findAllEmplacements = async (): Promise<Emplacement[]> => {
    const emplacements = await prisma.emplacement.findMany({
        include: {
            parent: true,
            children: {
                include: {
                    items: true
                }
            },
            items: true
        }
    });
    return emplacements.map(emplacement => Emplacement.fromPrisma(emplacement));
}

export const createEmplacement = async (createInput: Prisma.EmplacementCreateInput): Promise<Emplacement> => {
    const createdEmplacement = await prisma.emplacement.create({
        data: {
            ...createInput,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
    return Emplacement.fromPrisma(createdEmplacement);
}

export const updateEmplacement = async (id: string, updateInput: Prisma.EmplacementUpdateInput): Promise<Emplacement | null> => {
    const updatedEmplacement = await prisma.emplacement.update({
        where: { id },
        data: {
            ...updateInput,
            updatedAt: new Date()
        },
        include: {
            parent: true,
            children: true,
            items: true
        }
    });
    return updatedEmplacement ? Emplacement.fromPrisma(updatedEmplacement) : null;
}

export const deleteEmplacement = async (id: string): Promise<Emplacement | null> => {
    const deletedEmplacement = await prisma.emplacement.delete({
        where: { id },
        include: {
            parent: true,
            children: true,
            items: true
        }
    });
    return deletedEmplacement ? Emplacement.fromPrisma(deletedEmplacement) : null;
}

export default {
    findEmplacementById,
    findAllEmplacements,
    createEmplacement,
    updateEmplacement,
    deleteEmplacement
}

