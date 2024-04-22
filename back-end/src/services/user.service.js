import User from "../models/user.model.js";

// find all
const findAll = async () => {
  try {
    const result = await User.find();
    return result;
  } catch (error) {
    console.error("Error getting users", error);
    throw error;
  }
};

// create a record
const createOne = async (data) => {
  try {
    const newUser = new User(data);
    const result = newUser.save();
    return (await result)._id;
  } catch (error) {
    console.error("Error create data", error);
    throw error;
  }
};

// find by email
const findByEmail = async (email) => {
  try {
    const result = await User.findOne({ email });
    return result;
  } catch (error) {
    console.error("error find data", error);
    throw error;
  }
};

// find by id
const findById = async (id) => {
  try {
    const result = await User.findById(id);
    return result;
  } catch (error) {
    console.error("error find data", error);
    throw error;
  }
};

const update = async (id, dataUpdate) => {
  try {
    const result = await User.findByIdAndUpdate(id, dataUpdate, { new: true });
    return result;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export { findAll, createOne, findByEmail, findById, update };
