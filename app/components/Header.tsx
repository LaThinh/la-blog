import Link from "next/link";
import React from "react";
import { getCategories } from "@/app/services/graphCms";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="w-full bg-white border-b mb-8 sticky top-0 shadow-md z-30">
      <div className="container mx-auto px-10 py-2 flex justify-between items-center">
        <div className="logo">
          <Link
            href={"/"}
            className="cursor-pointer font-bold text-4xl text-blue-500"
          >
            La Blog
          </Link>
        </div>
        <div className="categories">
          <ul className="flex items-center gap-2">
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
