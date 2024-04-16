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

export { validationMusic };
