
const emplacement = (parent, args, context) => {
    return context.emplacementService.getEmplacement(args.id);
};

const emplacements = (parent, args, context) => {
    return context.emplacementService.getEmplacements();
};

const createEmplacement = (parent, args, context) => {
    return context.emplacementService.createEmplacement(args.input);
};

const updateEmplacement = (parent, args, context) => {
    return context.emplacementService.updateEmplacement(args.id, args.input);
};

const deleteEmplacement = (parent, args, context) => {
    return context.emplacementService.deleteEmplacement(args.id);
};

export default {
    Query: {
        emplacement,
        emplacements
    },
    Mutation: {
        createEmplacement,
        updateEmplacement,
        deleteEmplacement
    }
}