"use client";
import { CircularProgress } from "@mui/material";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/UserTabs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
export default function Menu_items() {
  const { loading: profileloading, data: profileData } = useProfile();
  const [image, setImage] = useState(null);
  const [imageUrl, setimageUrl] = useState("");
  const [imageCard, setImageCard] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [nutritionalInfo, setNutritionalInfo] = useState("");
  const [ingredients, setIngredients] = useState("");
  const handleProductImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    TransformFile(file);
  };
  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageCard(reader.result);
      };
    } else {
      setImageCard();
    }
  };
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    //upload images to cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "KmcOnline");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dbtbxt0fj/image/upload",
      formData
    );
    const imageUrl= await response.data.secure_url;
    const data = {
      description,
      cookingTime,
      difficultyLevel,
      nutritionalInfo,
      imageUrl,
      ingredients,
      title,
    };
    const res = await fetch("/api/menu_items", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setCookingTime("");
    setDescription("");
    setDifficultyLevel("");
    setImage(null);
    setImageCard("");
    setNutritionalInfo("");
    setTitle("");
    setIngredients("");
  }
  if (profileloading) {
    return (
      <div className="flex justify-center items-center mt-60">
        <CircularProgress />
      </div>
    );
  }
  if (!profileData.admin) {
    return (
      <div className="mt-20 text-center font-extrabold text-5xl">
        Not an Admin
      </div>
    );
  }
  return (
    <section className="mt-4 mb-6">
      <UserTabs isAdmin={true} />
      <div className="mt-8  flex justify-center items-center">
        <Link
          className="btn w-96 bg-red-600 text-white hover:bg-red-700 shadow-md shadow-gray-500 rounded-full"
          href="/pages/menu_items/product_list"
        >
          See the New Product
          <FaArrowRightLong />
        </Link>
      </div>
      <form
        className="mt-8 max-w-md mx-auto shadow-lg shadow-slate-400 rounded-xl"
        onSubmit={handleFormSubmit}
      >
        <div>
          <input
            type="file"
            accept="image/"
            onChange={handleProductImage}
            multiple
          />
          <img src={imageCard} alt="" />
        </div>
        <div className="flex flex-col">
          <label className="text-center">Menu Items Name</label>
          <input
            type="text"
            className="input input-error m-2"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <label className="text-center">cookingTime</label>
          <input
            type="text"
            className="input input-error m-2"
            value={cookingTime}
            onChange={(ev) => setCookingTime(ev.target.value)}
          />
          <label className="text-center">difficultyLevel</label>
          <input
            type="text"
            className="input input-error m-2"
            value={difficultyLevel}
            onChange={(ev) => setDifficultyLevel(ev.target.value)}
          />
          <label className="text-center">nutritionalInfo</label>
          <textarea
            type="text"
            className="input input-error m-2"
            value={nutritionalInfo}
            onChange={(ev) => setNutritionalInfo(ev.target.value)}
          />
          <label className="text-center">Description</label>
          <textarea
            type="text"
            className="input input-error m-2"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label className="text-center">ingredients</label>
          <textarea
            type="text"
            className="input input-error m-2"
            value={ingredients}
            onChange={(ev) => setIngredients(ev.target.value)}
          />
          <button
            type="submit"
            className="btn bg-red-500 hover:bg-red-700 border-white rounded-full text-white outline-white m-2"
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
}
