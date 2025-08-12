import mongoose, { mongo } from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  responsibilities: [{
    type: String
  }],
  postedBy: {
    type: String
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId
  }]
}, {timestamps: true});

const Job = mongoose.model('Job', JobSchema);

export default Job;