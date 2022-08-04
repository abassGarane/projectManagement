// import { clients, projects } from './sample.js'
import { GraphQLEnumType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { Project } from '../src/models/Project.model.js'
import { Client } from '../src/models/Client.model.js'

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    name: 'Client',
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id)
      }
    },
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    },

  }
})

// Mutations
const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const cl = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        })
        return cl.save()
      }
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Client.findOneAndDelete(args.id)
      }
    },

    // adding projects
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: GraphQLNonNull(new GraphQLEnumType({
            name: 'projectStatus',
            values: {
              "new": { value: "Not Started" },
              "progress": { value: "In progress" },
              "completed": { value: "Completed" }
            }
          })),
          defaultValue: "Not Started"
        },
        description: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const project = new Project({
          status: args.status,
          name: args.name,
          description: args.description,
          clientId: args.clientId
        })
        return project.save()
      }
    }
  }
})

let schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations
})
export { schema }
