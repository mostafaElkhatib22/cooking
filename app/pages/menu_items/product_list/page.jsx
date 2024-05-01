"use client"
import React, { useEffect, useState } from "react";
import { useProfile } from '@/components/UseProfile';
import { CircularProgress } from "@mui/material";
import UserTabs from '@/components/UserTabs';
import axios from "axios";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
export default function Product_list_Page() {
  const { loading: profileloading, data: profileData } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios.get("/api/menu_items").then((res) => {
      setMenuItems(res.data.items);
    });
  }, []);
  if (profileloading) {
    return (
      <div className="flex justify-center items-center mt-60">
        <CircularProgress />
      </div>
    );
  }
  if (!profileData.admin) {
    return "not an admin";
  }
  return (
    <section className="mt-20  mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8  flex justify-center items-center">
        <Link
          className="btn w-80 bg-red-600 text-white hover:bg-red-700 ml-3 shadow-md shadow-gray-500 rounded-full"
          href="/pages/menu_items"
        >
          Create new Items
          <FaArrowRightLong />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-sm text-gray-500 mt-5 text-left ">
          <label>Edite menu item:</label>
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-9 xl:grid-cols-6 md:grid-cols-4 gap-3 mr-5">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={`/pages/menu_items/edite/${item._id}`}
                className="btn bg-gray-300 hover:bg-slate-500 hover:text-white transition-all duration-200 text-black w-44 m-3 h-36 flex flex-col justify-evenly items-center gap-3"
                key={item._id}
              >
                <div>
                  <img
                    src={item.imageUrl}
                    className="rounded-md mt-3 w-20 h-14 hover:scale-125 transition-all duration-200"
                  />
                </div>
                {item.title}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
