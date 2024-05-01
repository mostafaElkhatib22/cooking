import mongoose from "mongoose";
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("successful");
  } catch (error) {
    console.log(error);
  }
};
export default connectMongoDB;