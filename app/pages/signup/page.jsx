"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {signIn}from "next-auth/react"
export default function Register() {
  const router = useRouter();
  const [error, setError] = useState();
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    if (!isValidEmail(email)) {
      setError("حساب غير صالح");
      return;
    }
    if (!password || password.length < 8) {
      setError("يجب ان تكون كلمة السر 8 ارقام او حروف");
      return;
    }
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("هذا الحساب بالفعل موجود");
      }
      if (res.status === 201) {
        setError("");
        router.push("/pages/login");
      }
    } catch (error) {
      setError("Error,try again");
      console.log(error);
    }
  };
  return (
    <div className="justify-center mt-16 text-black">
      <div className="w-[500px] p-6 m-auto bg-slate-200 rounded-md shadow-2xl shadow-current lg:max-w-lg mt-32 mb-20">
        <h1 className="text-3xl font-semibold text-center text-orange-700 [text-shadow:_0_2px_0_rgb(0_0_0_/_100%)]">
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">User name</span>
            </label>
            <input
              type="text"
              placeholder="user name"
              required
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email@example.com"
              required
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="enter password"
              required
              className="w-full input input-bordered input-primary"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            تسجيل
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4 flex flex-col justify-center items-center">
          -or-
        </div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href={"/pages/login"}
        >
          Login with an existing account
        </Link>
        <button
          type="submit"
          className="btn bg-[#3ec8ef] hover:bg-gradient-to-r from-[#d4e6bf] via-[#6ef06e] to-[#015901] w-full font-semibold "
          onClick={()=>signIn("google",{callbackUrl:"/"})}
        >
          login with Google{" "}
          <span className="text-2xl transition duration-1000  hover:rotate-[360deg] ">
            <FcGoogle />{" "}
          </span>{" "}
        </button>
      </div>
    </div>
  );
}
