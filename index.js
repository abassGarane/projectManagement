import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
import dotenv from 'dotenv'
import { dbConnect } from './src/config/db.connection.js'
import { schema } from './schema/schema.js'
dotenv.config()
app.use(cors())

dbConnect()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV === 'dev' ? true : false
}))
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log("Server running...")
})
