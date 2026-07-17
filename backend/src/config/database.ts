import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB");
    console.error(error);

    process.exit(1);
  }
};