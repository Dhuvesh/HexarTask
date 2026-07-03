import mongoose from 'mongoose';

const MissionVisionSchema = new mongoose.Schema({
  missionTitle: { type: String, default: "Our Mission" },
  missionDescription: { type: String, required: true },
  visionTitle: { type: String, default: "Our Vision" },
  visionDescription: { type: String, required: true },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: false },
  
}, { timestamps: true });

const MissionVision = mongoose.model('MissionVision', MissionVisionSchema);
export default MissionVision;