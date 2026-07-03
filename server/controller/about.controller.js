import About from '../models/about.model.js';

export const getAbout = async (req, res) => {
  try {
    const aboutData = await About.find().sort({ createdAt: -1 });
    res.status(200).json(aboutData);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching About data",
      error: error.message,
    });
  }
};

export const createAbout = async (req, res) => {
  try {
    const { heading, description, stats } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";


    const newAbout = new About({
      heading,
      description,
      imageUrl,
      
    });

    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create section",
      error: error.message,
    });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { heading, description, stats } = req.body;

    let updateFields = {
      heading,
      description,
    };

    // Safety check for stats parsing
    if (stats && stats !== "undefined" && stats !== "") {
      try {
        updateFields.stats = typeof stats === "string" ? JSON.parse(stats) : stats;
      } catch (e) {
        console.log("Stats parsing skipped or failed");
      }
    }

    // Check if a file was uploaded
    if (req.file) {
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ message: "About section not found" });
    }

    res.status(200).json(updatedAbout);
  } catch (error) {
    res.status(400).json({
      message: "Update failed",
      error: error.message,
    });
  }
};
export const deleteAbout = async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);

    if (!deletedAbout) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json({
      message: "About section deleted successfully",
    });
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