"use client";
import { useProfile } from "@/components/UseProfile";
import styled from "@emotion/styled";
import { Rating, Stack } from "@mui/material";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
export default function Single_Product() {
  const { id } = useParams();
  const { loading: profileloading, data: profileData } = useProfile();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [nutritionalInfo, setNutritionalInfo] = useState("");
  const [ingredients, setIngredients] = useState("");
  useEffect(() => {
    axios.get("/api/menu_items").then((res) => {
      const item = res.data.items.find((i) => i._id === id);
      setImage(item.imageUrl);
      setTitle(item.title);
      setCookingTime(item.cookingTime);
      setDescription(item.description);
      setDifficultyLevel(item.difficultyLevel);
      setNutritionalInfo(item.nutritionalInfo);
      setIngredients(item.ingredients);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center text-center shadow-md shadow-black rounded-lg m-4">
      <div className="w-[60%] flex flex-col justify-center items-center  ">
        <img className="rounded-lg w-[450px]" src={image} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between gap-9 items-center">
        <span className="text-xl text-center mr-4 font-mono font-bold">
         اسم الاكلة : {title} 
        </span>
          <Stack spacing={1}>
            <StyledRating
              name="customized-color"
              defaultValue={2}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </Stack>
        </div>
        <div className="flex justify-between gap-9 items-center">
          <span className="text-xl  mr-4 font-mono font-bold text-left">وقت الطبخ : {cookingTime}</span>
          <span className="text-xl  mr-4 font-mono font-bold text-left"> المتسوى : {difficultyLevel}</span>

        </div>
        <div className="flex justify-between items-start">
          <span className="text-xl font-mono font-bold text-left"> معلومات عن الاكلة : {nutritionalInfo}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-xl font-mono font-bold text-left"> مكونات  الاكلة : {ingredients}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-xl font-mono font-bold text-left"> الطريقة : {description}</span>
        </div>
      </div>
    </div>
  );
}
