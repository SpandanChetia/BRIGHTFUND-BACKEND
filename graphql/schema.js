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

    input UserInputData {
        fullName: String!
        email: String!
        password: String!
    }

    type RootMutation {
        createUser(userInput : UserInputData) : User!
    }
    schema {
        mutation:
    }
`);