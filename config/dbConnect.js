import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log("DB is connected ✅");
  } catch (error) {
    console.log(error);
  }
};
export default dbConnect;
