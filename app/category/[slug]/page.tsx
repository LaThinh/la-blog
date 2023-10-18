import PostGrid from "@/app/components/PostGrid";
import { IPost } from "@/app/interfaces";
import { getPostCategory, getCategoryBySlug } from "@/app/services/graphCms";
import React from "react";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);
  const posts: IPost[] = await getPostCategory(params.slug);

  return (
    <div>
      {!category || category.length < 1 ? (
        <div className="category not-found">
          Không Tồn tại Category slug = {params.slug}
        </div>
      ) : (
        <>
          <h1 className="page-title">{category[0]?.name}</h1>
          <PostGrid posts={posts} />
        </>
      )}
    </div>
  );
}
