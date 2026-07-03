import Banner from '../models/banner.model.js';

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, ctaText } = req.body;
    const backgroundImage = req.file ? `/uploads/${req.file.filename}` : '';

    const banner = new Banner({ title, subtitle, ctaText, backgroundImage });
    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { title, subtitle, ctaText } = req.body;
    let updateData = { title, subtitle, ctaText };

    if (req.file) {
      updateData.backgroundImage = `/uploads/${req.file.filename}`;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

