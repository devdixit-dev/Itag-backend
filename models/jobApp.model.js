import mongoose from "mongoose";

const JobApplication = new mongoose.Schema({
  appliedForRole: {
    type: String
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  }
}, {timestamps: true});

const JobApp = mongoose.model('JobApp', JobApplication);

export default JobApp;