import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true,
    unique: true
  },
  fileLink: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Report = mongoose.model('Report', ReportSchema);

export default Report;