import {
  createOne,
  findAll,
  findById,
  vinahouseMusic,
} from "../services/music.service.js";

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

// get music by id
const getMusicById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await findById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get vinahouse type music
const getVinahouseMusics = async (req, res) => {
  try {
    const response = await vinahouseMusic();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getMusics, createMusic, getMusicById, getVinahouseMusics };
