import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: {
    type: String
  },
  source: {
    type: String,
    enum: ['newsletter', 'financial_form']
  }
}, {timestamps: true});

const Email = mongoose.model('Email', EmailSchema);

export default Email;