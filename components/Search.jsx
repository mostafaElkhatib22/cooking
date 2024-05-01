"use client";
import React, { useState } from "react";
import SearchResult from "./SearchResult";
import Link from "next/link";
import { Rating, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "@emotion/styled";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultArr, setResultArr] = useState([]);
  async function getResult() {
    let res = await SearchResult(searchTerm);
    setResultArr(res);
  }
  return (
    <div className="flex flex-col">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none "
          placeholder="search...."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          className="p-2 text-white bg-orange-500 hover:cursor-pointer"
          onClick={getResult}
        >
          Search
        </button>
      </form>
      <div className="flex justify-center items-center">

      {resultArr.map((items, i) => {
        return (
          <div className="flex flex-wrap justify-center items-center w-full gap-4 m-3">
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
                href={"/"}
                className="btn w-[150px] bg-blue-500 hover:bg-blue-600 mb-1 text-white"
                >
                Read Details !
              </Link>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default Search;
