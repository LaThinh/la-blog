import React from "react";
import { getLastPosts } from "../services/graphCms";
import { IPost } from "../interfaces";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

export default async function WidgetNewPost({ items }: { items?: number }) {
  const last = items ? items : 3;
  const lastPosts: IPost[] = await getLastPosts(last);
  return (
    <div>
      <div className="widget">
        <h3 className="widget-title">Recent Posts</h3>
        <div className="widget-content">
          <div className="widget-post-list flex flex-col gap-3">
            {lastPosts &&
              lastPosts.length > 0 &&
              lastPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`post-item flex gap-2 items-center ${
                    index > 0 && "border-t pt-3"
                  } `}
                >
                  <Image
                    src={post.coverPhoto.url}
                    alt={post.title}
                    width={120}
                    height={120}
                    className="aspect-square w-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-2 justify-between">
                    <Link href={`/post/${post.slug}`} className="line-clamp-2">
                      {post.title}
                    </Link>
                    <div className="post-date text-sm italic dark:text-gray-300">
                      {moment(post.createAt).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
