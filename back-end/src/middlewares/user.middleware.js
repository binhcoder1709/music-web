import { findAll, findById } from "../services/user.service.js";

// check empty data
const checkEmptyUser = async (req, res, next) => {
  const id = req.params.id;
  const dataUser = await findById(id);
  if (dataUser) {
    next();
  } else {
    return res.status(404).json({ message: "Not Found Data" });
  }
};

export { checkEmptyUser };
