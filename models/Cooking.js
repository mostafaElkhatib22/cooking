import mongoose, { Schema } from "mongoose";
const CookingDetails = new Schema(
  {
    title: String,
    imageUrl: String,
    description: String,
    cookingTime: String,
    difficultyLevel: String,
    nutritionalInfo: String,
    ingredients: String,
  },
  {
    timestamps: true,
  }
);
const Cooking =
  mongoose.models.Product || mongoose.model("Product", CookingDetails);
export default Cooking;
