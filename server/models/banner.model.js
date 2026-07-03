import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  backgroundImage: { type: String },
  isActive: { type: Boolean, default: false }
}, { timestamps: true });

const Banner = mongoose.model('Banner', BannerSchema);
export default Banner;