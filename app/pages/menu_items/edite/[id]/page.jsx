"use client";
import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/UserTabs";

export default function Edite_Product() {
  const { id } = useParams();
  const { loading: profileloading, data: profileData } = useProfile();
  const [image, setImage] = useState(null);
  const [imageCard, setImageCard] = useState("");
  const [dir, setDir] = useState(false);
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
      setImageCard(item.imageUrl);
      setTitle(item.title);
      setCookingTime(item.cookingTime);
      setDescription(item.description);
      setDifficultyLevel(item.difficultyLevel);
      setNutritionalInfo(item.nutritionalInfo);
      setIngredients(item.ingredients);
    });
  }, []);
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
    const response = await axios.put(
      "https://api.cloudinary.com/v1_1/dbtbxt0fj/image/upload",
      formData
    );
    const imageUrl = await response.data.secure_url;
    const data = {
      description,
      cookingTime,
      difficultyLevel,
      nutritionalInfo,
      imageUrl,
      ingredients,
      title,
      _id: id,
    };
    const res = await fetch("/api/menu_items", {
      method: "PUT",
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
    setDir(true);
  }
  if (dir) {
    return redirect("/pages/menu_items/product_list");
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
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to delete this product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://localhost:3000/api/menu_items?id=` + id,
          {
            method: "DELETE",
          }
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
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

        setDir(true);
      }
    });
  };
  return (
    <section className="mt-20 flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center bg-slate-200 w-[60%] shadow-lg  shadow-slate-400 rounded-xl">
        <UserTabs isAdmin={true} />
        <div className="mt-8  flex justify-center items-center">
          <Link
            className="btn w-96 bg-red-600 text-white hover:bg-red-700 shadow-md shadow-gray-500 rounded-full"
            href="/pages/menu_items/product_list"
          >
            See the Products list
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
              Update
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center w-full">
          <button
            onClick={handleDelete}
            className="btn bg-red-700 hover:bg-red-900 border-white w-[35%] rounded-full text-white outline-white mt-4 mb-4"
          >
            Delete This Products <FaTrash />
          </button>
        </div>
      </div>
    </section>
  );
}
