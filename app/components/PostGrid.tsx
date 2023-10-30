"use client";

import React, { useEffect, useState } from "react";
import { IPost } from "@/app/interfaces";
import PostCard from "@/app/components/PostCard";
import { gql } from "graphql-request";
import { getPosts } from "@/app/services/graphCms";

export function PostGrid({ posts }: { posts?: IPost[] }) {
  const [postList, setPostList] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result: IPost[] = await getPosts();
      if (result.length > 0) {
        setPostList(result);
      }
    };
    if (posts) {
      setPostList(posts);
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <div className="@container w-full">
      <div
        className="post-grid grid auto-rows-fr gap-6 grid-cols-1 
        @xl:grid-cols-2 @2xl:gap-10 
        @4xl:grid-cols-3 @4xl:gap-8 @7xl:grid-cols-4 "
      >
        {postList &&
          postList.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default PostGrid;
