import Guide from "../models/GuideModels.js";

export const createGuide = async (req, res) => {
  try {
    const { name, email, language } = req.body;
    const guides = await Guide.create({ name, email, language });
    res.status(201).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGuide = async (req, res) => {
  try {
    const guides = await Guide.findAll();
    res.status(200).json(guides);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getGuideById = async (req, res) => {
  try {
    const { id } = req.query;
    const guides = await Guide.findByPk(id);
    if (!guides) return res.status(404).json({ message: "Guide not found" });
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateGuide = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, email, language } = req.body;
    const [updated] = await Guide.update({ name, email, language }, { where: { id } });
    if (updated) {
      const updatedGuide = await Guide.findByPk(id);
      res.status(200).json(updatedGuide);
    } else {
      res.status(404).json({ message: "Guide failed to update" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteGuide = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await Guide.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Guide failed to delete" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
