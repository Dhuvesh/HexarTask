import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: false },
}, { timestamps: true });

const About = mongoose.model('About', AboutSchema);
export default About;