"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
export default function SignIn() {
  const Session = useSession();
  const status = Session.status;
  const router = useRouter();
  const [error, setError] = useState();
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!isValidEmail(email)) {
      setError("حساب غير صالح");
      return;
    }
    if (!password || password.length < 8) {
      setError("يجب ان تكون كلمة السر 8 ارقام او حروف");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("خطا في الحساب او كلمة السر");
      if (res?.url) {
        router.replace("/");
      }
    } else {
      setError("");
    }
    if (res?.ok) {
      router.push("/");
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form
          action="#"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                placeholder="Email@example.com"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                placeholder="enter password"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link className="underline" href="/pages/signup">
                Sign up
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center text-gray-500 mt-4 flex flex-col justify-center items-center">
          -or-
        </div>
        <button
          type="submit"
          className="btn bg-[#3ec8ef] hover:bg-gradient-to-r from-[#d4e6bf] via-[#6ef06e] to-[#015901] w-full font-semibold "
          onClick={()=>signIn("google",{callbackUrl:"/"})}
        >
          login with Google{" "}
          <span className="text-2xl transition duration-1000  hover:rotate-[360deg] ">
            <FcGoogle />
          </span>
        </button>

      </div>
      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="https://wallpapers.com/images/featured/food-4k-1pf6px6ryqfjtnyr.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
