import React from "react";
import { getCategories } from "../services/graphCms";
import { ICategory } from "@/app/interfaces";
import Link from "next/link";

export default async function WidgetCategories() {
  const categories: ICategory[] = await getCategories();
  return (
    <div className="widget">
      <h3 className="widget-title">Widgets Categories</h3>
      <div className="widget-content">
        <ul>
          <li>
            <Link href={`/category/all`}>All</Link>
          </li>
          {categories &&
            categories.map((category, index) => (
              <li key={index}>
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
