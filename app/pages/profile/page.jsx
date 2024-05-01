"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import UserTabs from "@/components/UserTabs";
export default function Profile() {
  const session = useSession();
  const user = session.data?.user;
  let name = user?.name;
  const status = session.status;
  const [Name, setName] = useState(name);
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFatched, setPorfileFatched] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      setName(session.data.user.name);
      fetch("/api/profile").then((res) => {
        res.json().then((data) => {
          setPhone(data.phone);
          setCity(data.city);
          setCountry(data.country);
          setStreetAddress(data.streetAddress);
          setIsAdmin(data.admin);
          setPorfileFatched(true);
        });
      });
    }
  }, [name]);
  if (status === "loading" && !profileFatched) {
    return (
      <div className="text-center mt-36">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  async function handleProfile(ev) {
    ev.preventDefault();
    const res = await fetch(`/api/profile`, {
      cache: "no-cache",
      method: "PUT",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: JSON.stringify({
        name: Name,
        phone,
        city,
        country,
        streetAddress,
      }),
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
  }

  return (
    <div>
      <section className="mt-4 mb-6">
        {/* {saved && (
        <div className="flex justify-center mr-20 ml-20 items-center gap-1 border-2 border-green-300 bg-green-200 mb-4 rounded-lg">
          <SuccessBox>
          <BiCheck /> 
          تم حفظ البروفيل
          </SuccessBox>
        </div>
      )} */}
        {/* {isSaved && <InfoBox>saving....</InfoBox>} */}
        <UserTabs isAdmin={isAdmin} />
        <hr />
        <form
          onSubmit={handleProfile}
          className="max-w-md mx-auto shadow-lg shadow-slate-400 rounded-xl"
        >
          <div className=" flex gap-4 items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className=" w-full p-2 rounded-lg">
                {/* <Image
                src={user?.image}
                width={90}
                height={90}
                alt={"avatar"}
                objectFit={"contain"}
                className="rounded-lg w-full h-full mb-4"
              /> */}
                {/* <label>
                <input
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                  onChange={handleFileChange}
                />

                <span className="block border-gray-300 text-center btn bg-gray-500 text-white hover:bg-gray-700 cursor-pointer rounded-lg p-4">
                  غير صورتك
                </span>
              </label> */}
              </div>
            </div>
            <div className="grow flex flex-col items-start mr-5 gap-3 mt-4">
              <label>Name</label>
              <input
                className="input input-secondary w-full"
                type="text"
                placeholder="First and last name"
                value={Name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Email</label>
              <input
                className="input input-secondary w-full"
                type="email"
                placeholder="First and last name"
                value={user?.email}
                disabled={true}
              />
              <label>Adderss</label>
              <input
                className="input input-secondary w-full"
                type="text"
                placeholder="العنوان بالتفصيل"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <div className="flex justify-start items-start gap-4">
                <div>
                  <label>City</label>
                  <input
                    className="input input-secondary w-full"
                    type="text"
                    placeholder="المحافظة"
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                </div>
                <div>
                  <label>Counrty</label>
                  <input
                    className="input input-secondary w-full"
                    type="text"
                    placeholder="البلد"
                    value={country}
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                </div>
              </div>
              <label>Phone</label>
              <input
                className="input input-secondary w-full"
                type="tel"
                placeholder="رقم التليفون"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
              <button
                className="btn bg-red-500 text-white hover:bg-red-700 w-full mb-4"
                type="submit"
              >
                حفظ
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
