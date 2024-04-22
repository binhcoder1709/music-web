import { findById } from "../services/music.service.js";

// validation music data
const validationMusic = async (req, res, next) => {
  const data = req.body;
  if (
    !data.musicName ||
    !data.author ||
    !data.musicSource ||
    !data.musicImage
  ) {
    return res.status(400).json({ error: "Missing Data" });
  }
  next();
};

// check exist data by id
const checkIdExist = async (req, res, next) => {
  const id = req.params.id;
  const checkExist = await findById(id);
  if (!checkExist) {
    return res.status(404).json({ error: "Not Found Data By This Id" });
  }
  next();
};

export { validationMusic, checkIdExist };
