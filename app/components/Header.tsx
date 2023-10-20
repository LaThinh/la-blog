import Link from "next/link";
import React from "react";
import { getCategories } from "@/app/services/graphCms";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="w-full bg-white border-b mb-5 sticky top-0 shadow-md z-30">
      <div className="mx-auto px-3 py-4 xl:container lg:px-5 flex justify-between items-center">
        <div className="logo">
          <Link
            href={"/"}
            className="cursor-pointer font-bold text-4xl text-blue-500"
          >
            La Blogs
          </Link>
        </div>
        <div className="categories">
          <ul className="items-center gap-2 hidden lg:flex">
            <li className="px-4 font-semibold">
              <Link href={`/category/all`}>All</Link>
            </li>
            {categories.map((category) => (
              <li className="px-4 font-semibold" key={category.id}>
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
