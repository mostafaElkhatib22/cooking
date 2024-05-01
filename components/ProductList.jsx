"use client";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Stack } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Rating } from "@mui/material";
import axios from "axios";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
export default function ProductList() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("/api/menu_items");
        console.log(res.data.items);
        setProduct(res.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center mt-3">
      <Link
        href="/pages/search"
        className="p-2 text-white bg-orange-500 hover:cursor-pointer"
      >
        Search
      </Link>
      <div className="flex flex-wrap justify-center items-center w-full gap-4 m-3">
        {product.map((items, index) => (
          <div className="flex flex-wrap justify-center items-center">
            <div
              className="flex flex-wrap justify-center items-center w-full gap-4"
              key={index}
            >
              <div className="flex flex-col justify-center items-center max-h-[450px] flex-wrap shadow-md shadow-black/50 rounded-lg max-w-[200px] gap-3">
                <div className=" flex w-full justify-center items-center">
                  <img
                    className="w-[95%] rounded-lg mt-2 mb-2"
                    src={items.imageUrl}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-0">
                  <h2 className="text-center font-mono underline  font-semibold">
                    {items.title.substring(0, 20)}
                  </h2>
                  <p className="text-center font-serif text-gray-600 font-semibold">
                    {items.description.substring(0, 50)}....
                  </p>
                  <span>
                    {" "}
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
                  </span>
                </div>
                <Link
                  href={`/pages/single-product/${items._id}`}
                  className="btn w-[150px] bg-blue-500 hover:bg-blue-600 mb-1 text-white"
                >
                  Read Details !
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
