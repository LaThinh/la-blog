import React from "react";
import { getCategories } from "../services/graphCms";
import { ICategory } from "@/app/interfaces";
import Link from "next/link";

export default async function WidgetCategories() {
  const categories: ICategory[] = await getCategories();
  return (
    <div className="widget">
      <h3 className="widget-title">Categories</h3>
      <div className="widget-content !p-0">
        <ul className="">
          <li className="py-3 px-5 font-semibold">
            <Link href={`/category/all`}>All Categories</Link>
          </li>
          {categories &&
            categories.map((category, index) => (
              <li key={index} className="py-3 px-5 font-semibold border-t">
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
