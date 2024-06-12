import emplacementRepository from "./emplacement.repository";
import health from "./health.repository";
import itemRepository from "./item.repository";

export default {
    health,
    emplacement: emplacementRepository,
    item: itemRepository
}