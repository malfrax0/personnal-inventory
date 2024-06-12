import { Prisma } from '@prisma/client';
import { PartialDeep } from "type-fest";
import Item from './item.entity';

type FromPrismaType = PartialDeep<Prisma.EmplacementGetPayload<{ select: { [K in keyof Required<Prisma.EmplacementSelect>]: true } }>, {recurseIntoArrays: true}>

class Emplacement {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    parent?: Emplacement | null;
    children: Emplacement[];
    items: Item[];

    constructor(id: string, title = "", description = "", createdAt: Date | null = null, updatedAt: Date | null = null, parent: Emplacement | null = null, children: Emplacement[] = [], items: Item[] = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.parent = parent;
        this.children = children;
        this.items = items;
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }

    static fromPrisma(emplacement: FromPrismaType, narrow = false): Emplacement {
        if (narrow) {
            return new Emplacement(emplacement.id, emplacement.title, emplacement.description, emplacement.createdAt, emplacement.updatedAt, emplacement.parent ? new Emplacement(emplacement.id) : null, emplacement.children?.map(child => new Emplacement(child.id)), emplacement.items?.map(item => new Item(item.id)));
        }
        return new Emplacement(emplacement.id, emplacement.title, emplacement.description, emplacement.createdAt, emplacement.updatedAt, emplacement.parent ? this.fromPrisma(emplacement.parent, true) : null, emplacement.children?.map(child => this.fromPrisma(child, true)), emplacement.items?.map(item => Item.fromPrisma(item, true)));
    }
    
    toPrisma(narrow = false): FromPrismaType {
        if (narrow) return { id: this.id };
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            parent: this.parent?.toPrisma(true) ?? undefined,
            children: this.children?.map(child => child.toPrisma(true)),
            items: this.items?.map(item => item.toPrisma(true))
        };
    }
}

export default Emplacement;