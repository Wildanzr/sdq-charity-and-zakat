import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.error("MONGODB_URI is not set");
  }

  if (isConnected) {
    console.info("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sdqcharity",
    });
    isConnected = true;
    console.info("MongoDB is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
