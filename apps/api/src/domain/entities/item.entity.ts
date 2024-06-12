import { Prisma } from "@prisma/client";
import { PartialDeep } from "type-fest";
import Emplacement from "./emplacement.entity";

type FromPrismaType = PartialDeep<Prisma.ItemGetPayload<{ select: { [K in keyof Required<Prisma.ItemSelect>]: true } }>, {recurseIntoArrays: true}>

class Item {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    emplacement: Emplacement;

    constructor(id: string, title: string = "", description: string = "", createdAt: Date = new Date(), updatedAt: Date = new Date(), tags: string[] = [], emplacement: Emplacement = new Emplacement("")) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tags = tags;
        this.emplacement = emplacement;
    }

    static fromPrisma(item: FromPrismaType, narrow: boolean = false): Item {
        return new Item(item.id, item.title, item.description, item.createdAt, item.updatedAt, item.tags, Emplacement.fromPrisma(item.emplacement, true));
    }

    toPrisma(narrow: boolean = false): FromPrismaType {
        if (narrow) return { id: this.id };
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            tags: this.tags,
            emplacement: this.emplacement.toPrisma(true)
        };
    }
}

export default Item;