import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['In Progress', 'Not Started', 'Completed'],
    default: 'Started'
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  }
})

const Project = mongoose.model('Project', ProjectSchema)
export { Project }
