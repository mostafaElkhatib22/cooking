"use server";
import Cooking from "@/models/Cooking";
import mongoose from "mongoose";
async function SearchResult(str) {
 await mongoose.connect(process.env.MONGOOSE_URL)
  let searchTerm = str;
  const convertFirstLetter = (text) => {
    const convert = text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
      match.toUpperCase()
    );
    return convert;
  };
  const searchTermFirst = convertFirstLetter(searchTerm);
  let results = await Cooking.find({
    $or: [
      {
        title: { $regex: searchTerm },
      },
      {
        description: { $regex: searchTerm },
      },
      {
        difficultyLevel: { $regex: searchTerm },
      },
      {
        nutritionalInfo: { $regex: searchTerm },
      },
      {
        ingredients: { $regex: searchTermFirst },
      },
    ],
  });
  return results;
}

export default SearchResult;
