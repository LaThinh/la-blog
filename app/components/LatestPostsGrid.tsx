"use client";

import React, { memo, useEffect, useState } from "react";
import { IPost } from "@/app/interfaces";
import { useInView } from "react-intersection-observer";
import { Button } from "@nextui-org/react";
import PostGrid from "./PostGrid";
import PostCard from "./PostCard";
import { getPostsPage } from "@/app/services/graphCms";
import Loading from "./Loading";

export function LatestPostsGrid({
  pageSize,
  pageAutoLoad,
  postData,
}: {
  pageSize: number;
  pageAutoLoad: number;
  postData?: IPost[];
}) {
  const [postList, setPostList] = useState<IPost[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    if (postData && postData.length > 0) {
      setPostList(postData);
      setLoading(false);
      setPage(1);
    }
  }, []);

  useEffect(() => {
    async function getPosts(page: number) {
      // console.log("Get Posts Page " + page);
      try {
        setLoading(true);
        const posts: IPost[] = await getPostsPage(page, pageSize);
        console.log(posts);

        if (postList.length < 1) setPostList(posts);
        else setPostList((prevList) => [...prevList, ...posts]);

        if (posts.length < pageSize) {
          setLoadMore(false);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    if (!postData || page > 0) getPosts(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const { ref } = useInView({
    onChange(inView, entry) {
      if (inView && !loading && page < pageAutoLoad) {
        setPage(page + 1);
      }
    },
  });

  return (
    <div className="post-grid-wrapper">
      {loading && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loading text={"Loading Posts"} />{" "}
        </div>
      )}

      {postList.length > 0 && (
        <div className="@container flex flex-col gap-5 justify-center">
          <h2 className="text-xl lg:text-3xl border-b pb-2 mb-3">
            Latest Posts Grid
          </h2>

          <div
            className="post-grid grid auto-rows-fr gap-6 grid-cols-1 
        @lg:grid-cols-2 @2xl:gap-10 
        @4xl:grid-cols-3 @4xl:gap-8 @6xl:grid-cols-4 "
          >
            {postList &&
              postList.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
          {loadMore && (
            <div className="flex justify-center my-5">
              <Button
                className="load-more px-5 py-2 w-auto"
                ref={ref}
                size="lg"
                color="primary"
                radius="lg"
                onClick={handleLoadMore}
                disabled={loading}
                isLoading={loading}
                spinnerPlacement="end"
              >
                {loading
                  ? `Loading page ${page}`
                  : `Load more page ${page + 1}`}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LatestPostsGrid;
