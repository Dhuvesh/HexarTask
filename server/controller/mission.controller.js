import MissionVision from '../models/mission.model.js';

export const getMissionVision = async (req, res) => {
  try {
    const data = await MissionVision.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Mission/Vision data",
      error: error.message,
    });
  }
};

export const createMissionVision = async (req, res) => {
  try {
    const {
      missionTitle,
      missionDescription,
      visionTitle,
      visionDescription,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newContent = new MissionVision({
      missionTitle,
      missionDescription,
      visionTitle,
      visionDescription,
      imageUrl,
    });

    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create content",
      error: error.message,
    });
  }
};

export const updateMissionVision = async (req, res) => {
  try {
    const {
      missionTitle,
      missionDescription,
      visionTitle,
      visionDescription,
    } = req.body;

    let updateFields = {
      missionTitle,
      missionDescription,
      visionTitle,
      visionDescription,
    };

    if (req.file) {
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedData = await MissionVision.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

export const deleteMissionVision = async (req, res) => {
  try {
    const deletedItem = await MissionVision.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Section not found" });
    }

    res
      .status(200)
      .json({ message: "Mission & Vision section deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Deletion failed",
      error: error.message,
    });
  }
};

export const setActiveAbout = async (req, res) => {
  try {
    // 1. Set ALL to inactive
    await About.updateMany({}, { isActive: false });
    // 2. Set the chosen one to active
    const activeItem = await About.findByIdAndUpdate(
      req.params.id, 
      { isActive: true }, 
      { new: true }
    );
    res.status(200).json(activeItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};