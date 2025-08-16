import mongoose from 'mongoose';

const GuideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Guide = mongoose.model('Guide', GuideSchema);

export default Guide;