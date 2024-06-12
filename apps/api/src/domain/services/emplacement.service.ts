import { GraphQLError } from "graphql";
import emplacementRepository from "../../infrastructure/repositories/emplacement.repository";
import Emplacement from "../entities/emplacement.entity";

const getEmplacement = async (id: string): Promise<Emplacement> => {
    const emplacement = await emplacementRepository.findEmplacementById(id);
    if (!emplacement) {
        throw new GraphQLError(`Emplacement with id ${id} not found`);
    }
    return emplacement;
}

const getEmplacements = (): Promise<Emplacement[]> => {
    return emplacementRepository.findAllEmplacements();
}

type CreateEmplacementInput = {
    title: string;
    description: string;
    parentId?: string;
}

const createEmplacement = async (input: CreateEmplacementInput): Promise<Emplacement> => {
    const parent = input.parentId ? await emplacementRepository.findEmplacementById(input.parentId) : null;
    if (input.parentId && !parent) {
        throw new GraphQLError(`Parent emplacement with id ${input.parentId} not found`);
    }
    
    const newEmplacement = await emplacementRepository.createEmplacement({
        title: input.title,
        description: input.description,
        parent: parent ? { connect: { id: parent.id } } : undefined
    });

    return newEmplacement
}

type UpdateEmplacementInput = Partial<CreateEmplacementInput>;

const updateEmplacement = async (id: string, input: UpdateEmplacementInput): Promise<Emplacement> => {
    const emplacement = await emplacementRepository.findEmplacementById(id);
    if (!emplacement) {
        throw new GraphQLError(`Emplacement with id ${id} not found`);
    }

    const parent = input.parentId ? await emplacementRepository.findEmplacementById(input.parentId) : null;
    if (input.parentId && !parent) {
        throw new GraphQLError(`Parent emplacement with id ${input.parentId} not found`);
    }

    return emplacementRepository.updateEmplacement(id, {
        title: input.title,
        description: input.description,
        parent: parent ? { connect: { id: parent.id } } : undefined
    });
}

const deleteEmplacement = async (id: string): Promise<Emplacement> => {
    const emplacement = await emplacementRepository.findEmplacementById(id);
    if (!emplacement) {
        throw new GraphQLError(`Emplacement with id ${id} not found`);
    }

    return emplacementRepository.deleteEmplacement(id);
}

export default {
    getEmplacement,
    getEmplacements,
    createEmplacement,
    updateEmplacement,
    deleteEmplacement
}