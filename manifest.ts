import {createModule, gql} from "graphql-modules";

export const manifestTypeDefs = [
    gql`
        #Types
        type App {
            manifestType: String
        }
        #Queries
        type Query {
            getManifest: String
        }
        #Mutations
        type Mutation {
            postManifest: String

        }
        #Subscription
        type Subscription {
            subManifest: String

        }
    `,
]

export const manifestResolvers = {
    Query: {
        async getManifest (parent: any, args: any, request: any) {
           return ''
        },
    },
    Mutation: {
        async postManifest (parent: any, args: any, request: any) {
            return ''
        },
    },
    Subscription: {
        async subManifest (parent: any, args: any, request: any) {
            return ''
        },
    },
}

export const manifestModule = createModule({
    id: "manifest-module",
    dirname: __dirname,
    typeDefs: manifestTypeDefs,
    resolvers: manifestResolvers
});
