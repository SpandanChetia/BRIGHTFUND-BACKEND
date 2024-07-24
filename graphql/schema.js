const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Fundraiser {
        _id: ID!
        title: String!
        description: String!
        imageUrl: String!
        organizer: User!
        createdAt: String!
    }
    type User{
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        fundraisers: [Fundraiser!]!
    }    

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        fullName: String!
        email: String!
        password: String!
    }

    input FundraiserInputData {
        title: String!
        description: String!
        imageUrl: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput : UserInputData) : User!
        createFundraiser(fundraiserInput: FundraiserInputData): Fundraiser!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);