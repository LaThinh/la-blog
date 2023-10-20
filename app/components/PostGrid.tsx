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
        className="post-grid grid auto-rows-fr gap-6 grid-cols-1 
        @2xl:grid-cols-2 @2xl:gap-10 
        @4xl:grid-cols-3 @4xl:gap-8 @6xl:grid-cols-4 "
      >
        {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default PostGrid;
