import Tourist from "../models/TouristModels.js";

export const createTourist = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await Tourist.create({ name, email });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTourist = async (req, res) => {
  try {
    const tourist = await Tourist.findAll(
    //   {
    //   include: [
    //     {
    //       model: Transaksi,
    //       as: "Transaksis",
    //       include: [
    //         {
    //           model: Cake,
    //           as: "Cake",
    //         },
    //       ],
    //     },
    //   ],
    // }
  );
    res.status(200).json(tourist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTouristById = async (req, res) => {
  try {
    const { id } = req.query;
    const tourist = await Tourist.findByPk(id,
    //    {
    //   include: [
    //     {
    //       model: Transaksi,
    //       as: "Transaksis",
    //       include: [
    //         {
    //           model: Cake,
    //           as: "Cake",
    //         },
    //       ],
    //     },
    //   ],
    // }
  );
    if (!Tourist) return res.status(404).json({ message: "Tourist not found" });
    res.status(200).json(tourist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTourist = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, email } = req.body;

    const [updated] = await Tourist.update({ name, email }, { where: { id } });
    if (updated) {
      const updatedTourist = await Tourist.findByPk(id);
      res.status(200).json(updatedTourist);
    } else {
      res.status(404).json({ message: "Tourist not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTourist = async (req, res) => {
  try {
    const { id } = req.query;
    const deleted = await Tourist.destroy({ where: { id } });
    if (deleted) {
      res.status(204).json(` Tourist ke ${id} berhasil dihapus`);
    } else {
      res.status(404).json({ message: "Tourist not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
