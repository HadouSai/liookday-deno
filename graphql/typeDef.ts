import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

const typeDef = (gql as any)`
    type User {
        username: String!
        email: String!
        password: String!
        id: ID!
    }

    type Message {
        msg: String
    }

    type Token {
        token: String
    }

    input TokenInput {
        token: String!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    input UserLoginInput {
        email: String!
        password: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        singIn(input: UserInput): Token
        login(input: UserLoginInput): Token
        logOut(input: TokenInput): Message
    }

`;

export default typeDef;
