import mongoose from "mongoose";

const mongooseConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database successfully");
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
export default mongooseConnect;