const ApolloServer = require('apollo-server').ApolloServer
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer
const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    hello: String
    helloFromUser(user: String!): String
    whoCanSendHello(domain: String): Users
  }

  type Users {
    users: [User]
  }

  type User {
    firstName: String
    lastName: String
    email: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hi! Love from @fonne.',
    helloFromUser: (parent, { user }) => `Hi! Love from ${user}`,
    whoCanSendHello: (parent, { domain }) => {
      if (domain === 'technologist') {
        return {
          users: [
            {
              firstName: 'Alejo',
              lastName: 'Yarce',
              email: 'alejo@mattersupply.co'
            },
            {
              firstName: 'Miguel',
              lastName: 'Santamaria',
              email: 'miguelito@mattersupply.co'
            },
            {
              firstName: 'Fabian',
              lastName: 'Gomez',
              email: 'fabian@mattersupply.co'
            }
          ]
        }
      }

      return {
        users: [
          {
            firstName: 'Kim',
            lastName: 'Oakes',
            email: 'kim@mattersupply.co'
          }
        ]
      }
    }
  }
}

function createLambdaServer () {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  })
}

function createLocalServer () {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  })
}

module.exports = { createLambdaServer, createLocalServer }
