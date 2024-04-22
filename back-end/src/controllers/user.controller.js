import {
  accessToken,
  checkExistUser,
  decryptionPassword,
} from "../middlewares/login.middleware.js";
import {
  createOne,
  findAll,
  findById,
  update,
} from "../services/user.service.js";

// get data
const getUsers = async (req, res) => {
  try {
    const response = await findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get data by id
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await findById(id);
    res.status(200).json(response);
  } catch (error) {}
};

// create data
const createUser = async (req, res) => {
  const data = req.body;
  try {
    await createOne(data);
    res.status(201).json({ message: "Create Data Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login user account
const loginUser = async (req, res) => {
  const token = req.token;
  try {
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update data
const updateData = async (req, res) => {
  const id = req.params.id;
  const dataUpdate = req.body;
  try {
    await update(id, dataUpdate);
    res.status(200).json({ error: "Data Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsers, getUserById, createUser, loginUser, updateData };
