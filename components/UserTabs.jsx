"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex justify-center gap-6 items-center mb-6 flex-wrap">
      <Link
        className={
          path === "/pages/profile"
            ? "btn bg-red-600 text-white hover:bg-red-700 shadow-md shadow-gray-500 rounded-full"
            : "btn bg-gray-600 text-white hover:bg-gray-700 shadow-md shadow-gray-500 rounded-full"
        }
        href={"/pages/profile"}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/pages/menu_items"}
            className={
              path.includes("menu_items")
                ? "btn bg-red-600 text-white hover:bg-red-700 shadow-md shadow-gray-500 rounded-full"
                : "btn bg-gray-600 text-white hover:bg-gray-700 shadow-md shadow-gray-500 rounded-full"
            }
          >
            Menu Items
          </Link>
        </>
      )}
    </div>
  );
}
