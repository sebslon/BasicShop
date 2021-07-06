import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import addToCart from "./addToCart";

export const extendGraphQLSchema = graphQLSchemaExtension({
  typeDefs: `
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
