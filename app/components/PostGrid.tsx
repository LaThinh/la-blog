import React from "react";
import { IPost } from "@/app/interfaces";
import PostCard from "@/app/components/PostCard";
import { gql } from "graphql-request";
import { getPosts } from "@/app/services/graphCms";

async function PostGrid({ posts }: { posts?: IPost[] }) {
  if (!posts) {
    posts = await getPosts();
  }

  return (
    <div className="@container  w-full">
      <div
        className="post-grid grid gap-5 grid-cols-1 
        @2xl:grid-cols-2 @2xl:gap-6 
        @4xl:grid-cols-3 @4xl:gap-8 @6xl:grid-cols-4 "
      >
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostGrid;
