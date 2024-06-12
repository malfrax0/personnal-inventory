import { graphql } from "../gql";

export const emplacements = graphql(/* GraphQL */`
    query Q_EMPLACEMENTS {
        emplacements {
            id
            title
            description
            createdAt
            updatedAt
        }
    }
`);

export const emplacement = graphql(/* GraphQL */`
    query Q_EMPLACEMENT($id: String!) {
        emplacement(id: $id) {
            id
            title
            description
            createdAt
            updatedAt
            parent {
                id
                title
            }
            items {
                id
                title
                description
                tags
            }
        }
    }
`)

export default {
    emplacements,
    emplacement
}