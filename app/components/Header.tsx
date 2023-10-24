//import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { getCategories } from "@/app/services/graphCms";
import ThemeSwitch from "./ThemeSwitch";

// const ThemeSwitch = dynamic(() => import("@/app/components/ThemeSwitch"), {
//   ssr: false,
// });

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="w-full bg-white dark:bg-slate-700 border-b sticky top-0 shadow-md z-30">
      <div className="mx-auto px-5 py-2 xl:container lg:px-8 lg:py-4 flex justify-between items-center">
        <div className="logo order-2 md:order-1">
          <Link
            href={"/"}
            className="cursor-pointer text-blue-500 dark:text-white"
          >
            <span className="text-gradient !text-4xl !lg:text-5xl">
              La Blogs
            </span>
          </Link>
        </div>
        <div className="categories order-1 md:order-2">
          <ul className="items-center gap-2 hidden md:flex">
            <li className="px-4 font-semibold">
              <Link href={`/category/all`}>All</Link>
            </li>
            {categories.map((category) => (
              <li
                className="px-4 font-semibold text-gradient-blue"
                key={category.id}
              >
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="setting order-3">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
