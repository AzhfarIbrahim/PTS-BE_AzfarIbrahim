import Guide from "../models/GuideModels.js";
import Tour from "../models/TourModels.js";

export const createTour = async (req, res) => {
  const { name, price, description, imageUrl, GuideId} = req.body;
  const tour = await Tour.create({
    name,
    description,
    price,
    imageUrl,
    GuideId: GuideId 
  });

  res.status(201).json(tour);
};

export const getTour = async (req, res) => {
  try {
    const tours = await Tour.findAll(
      {
      include: [{ model: Guide, as: "Guide", required: true }],
    }
  );
    res.status(200).json(tours);
  } catch (error) {
    console.log(error); //ini untuk melihat error di console
    res.status(500).json({ error: error.message });
  }
};

export const getTourById = async (req, res) => {
  try {
    const { id } = req.query;
    const tour = await Tour.findByPk(id,
       {
        include: [{ model: Guide, as: "Guide", required: true }],
    }
  );
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, price, description, imageUrl, GuideId } = req.body;
    const [updated] = await Tour.update(
      { name, price, description, imageUrl, 
       GuideId 
      },
      { where: { id } }
    );
    if (updated) {
      const updatedTour = await Tour.findByPk(id);
      res.status(200).json(updatedTour);
    } else {
      res.status(404).json({ message: "Tour failed to update" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await Tour.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Tour failed to delete" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
