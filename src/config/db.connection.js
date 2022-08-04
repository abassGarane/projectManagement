import mongoose from "mongoose"
// const connectionURI = process.env.NODE_ENV === 'dev' ? "mongodb://localhost:27017/graphql" : ''
const con = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/graphql")
    console.log('connected...')
  } catch (error) {
    console.log(error)
  }
}
export { con as dbConnect }

