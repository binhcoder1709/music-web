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

export { findAll, createOne };
