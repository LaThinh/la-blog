import PostGrid from "@/app/components/PostGrid";
import Sidebar from "@/app/components/Sidebar";
import { ICategory, IPost } from "@/app/interfaces";
import {
  getPostCategory,
  getCategoryBySlug,
  getPosts,
  getCategories,
} from "@/app/services/graphCms";
import React from "react";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  let category: ICategory[] = await getCategoryBySlug(params.slug);
  let posts: IPost[]; // = await getPostCategory(params.slug);
  //const categories = await getCategories();

  const slug = params.slug;
  if (slug === "all") {
    posts = await getPosts();
  } else {
    posts = await getPostCategory(params.slug);
  }

  const showSidebar = false;

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row gap-5 justify-between xl:gap-10 ">
        <div
          className={`col-main flex flex-col w-full basis-full gap-5 lg:flex-1 
        ${showSidebar && "lg:max-w-[calc(100%-300px)]"} `}
        >
          {slug && slug === "all" ? (
            <div className="page-header bg-white p-5">
              <h1 className="page-title !mb-0">Category: All</h1>
            </div>
          ) : !category || category.length < 1 ? (
            <div className="category not-found">
              Không Tồn tại Category slug = {params.slug}
            </div>
          ) : (
            <div className="page-header bg-white p-5">
              <h1 className="page-title !mb-0">
                Category: {category[0]?.name}
              </h1>
            </div>
          )}

          <PostGrid posts={posts} />
        </div>
        {showSidebar && (
          <div className="sidebar basis-full lg:basis-1/4 min-w-[280px]">
            <Sidebar />
          </div>
        )}
      </div>
    </>
  );
}
