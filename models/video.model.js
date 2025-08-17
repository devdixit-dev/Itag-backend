import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Video = mongoose.model('Video', VideoSchema);

export default Video;