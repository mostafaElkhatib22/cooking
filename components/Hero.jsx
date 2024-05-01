import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://wallpapers.com/images/hd/food-4k-m37wpodzrcbv5gvw.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <Link href='/pages/products' className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
