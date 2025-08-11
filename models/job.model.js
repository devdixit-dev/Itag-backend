import mongoose from "mongoose";

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
  exp: {
    type: String,
    required: true
  },
  keyReq: [{
    type: String
  }],
  responsibilities: [{
    type: String
  }],
  postedBy: [{
    type: mongoose.Schema.Types.ObjectId
  }]
}, {timestamps: true});

const Job = mongoose.model('Job', JobSchema);

export default Job;