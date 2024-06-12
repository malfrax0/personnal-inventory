import { Prisma } from '@prisma/client';

class Emplacement {
    id: string;
    title: string;
    description: string;
    parent: Emplacement;
    children: Emplacement[];

    constructor(id: string, title: string, description: string, parent: Emplacement, children: Emplacement[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.parent = parent;
        this.children = children;
    }

    static fromPrisma(emplacement: Prisma.Emplacement): Emplacement {
        return new Emplacement(emplacement.id, emplacement.title, emplacement.description, emplacement.parent, emplacement.children);
    }
    
    toPrisma(): PrismaEmplacement {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            parent: this.parent,
            children: this.children
        };
    }
}