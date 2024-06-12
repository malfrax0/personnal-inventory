import services from "../../domain/services";

const emplacement = (_, args) => {
    return services.emplacement.getEmplacement(args.id);
};

const emplacements = () => {
    return services.emplacement.getEmplacements();
};

const createEmplacement = (_, args) => {
    return services.emplacement.createEmplacement(args.input);
};

const updateEmplacement = (_, args) => {
    return services.emplacement.updateEmplacement(args.id, args.input);
};

const deleteEmplacement = (_, args) => {
    return services.emplacement.deleteEmplacement(args.id);
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