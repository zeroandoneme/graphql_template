import { createModule, gql } from "graphql-modules";
import { PubSub } from "graphql-subscriptions";

import {
  getAllUsers as getAllUsersService,
  addUser as addUserService,
} from "./Services/user.service";

const pubsub = new PubSub();

export const userModule = createModule({
  id: "user-module",
  dirname: __dirname,
  typeDefs: [
    gql`
      #Types
      type User {
        name: String!
        age: Int!
      }
      #Queries
      type Query {
        getAllUsers: [User!]!
      }
      #Mutations
      type Mutation {
        createUser(name: String!, age: Int!): User!
      }
      #Subscription
      type Subscription {
        userCreated: User!
      }
    `,
  ],
  resolvers: {
    Query: {
      async getAllUsers(parent: any, args: any, request: any) {
        console.log("Trying to get all users.");
        const users = await getAllUsersService();
        console.log("Got all users.");
        return users;
      },
    },
    Mutation: {
      async createUser(parent: any, args: any) {
        const user = args;
        console.log("Trying to add user.");
        const newUser = await addUserService(user);
        console.log("Successfully added user.");

        console.log("Trying to publish an event.");
        pubsub.publish("USER_CREATED", { userCreated: newUser });
        console.log("Successfully published an event.");

        return newUser;
      },
    },
    Subscription: {
      userCreated: {
        subscribe: () => pubsub.asyncIterator(["USER_CREATED"]),
      },
    },
  },
});
