import Music from "../models/music.model.js";

// find all
const findAll = async () => {
  try {
    const result = await Music.find();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// create one record
const createOne = async (data) => {
  try {
    const newMusic = new Music(data);
    const result = newMusic.save();
    return (await result)._id;
  } catch (error) {
    console.error("Error create data", error);
    throw error;
  }
};

// find by id
const findById = async (id) => {
  try {
    const result = await Music.findById(id);
    return result;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

// get type vinahouse of music data
const vinahouseMusic = async () => {
  try {
    const result = await Music.find({ type: { $in: ["vinahouse"] } });
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { findAll, createOne, findById, vinahouseMusic };
