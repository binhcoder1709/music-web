import { createOne, findAll } from "../services/music.service.js";

// get data
const getMusics = async (req, res) => {
  try {
    const response = await findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create music data
const createMusic = async (req, res) => {
  const data = req.body;
  try {
    await createOne(data);
    res.status(201).json({ message: "Create Data Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getMusics, createMusic };
