import React from "react";
import { gql } from "graphql-request";
import { IPost } from "@/app/interfaces";
import { getPostDetail } from "@/app/services/graphCms";
//import Image from "next/image";
import { Image } from "@nextui-org/react";
import moment from "moment";
import Sidebar from "@/app/components/Sidebar";

async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post: IPost = await getPostDetail(params.slug);

  return (
    <div className="flex w-full flex-col lg:flex-row gap-5 justify-between xl:gap-10 ">
      <div
        className="main flex flex-col basis-full gap-5 lg:flex-1 lg:max-w-[calc(100%-280px)]
      bg-white border rounded-2xl shadow-md p-3 lg:p-5 xl:p-10"
      >
        <article className="post">
          <Image
            className="mx-auto mb-10 shadow-md"
            src={post.coverPhoto.url}
            alt={post.title}
            removeWrapper
          />
          <h1 className="page-title post-title">{post.title}</h1>
          <div className="author">
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar.url}
                alt={post.author.name}
                width={64}
                height={64}
                sizes="32"
                className="object-cover rounded-full aspect-square shadow-md"
              />
              <h5 className="text-xl">{post.author.name}</h5>
              {moment(post.createAt).format("DD/MM/YYYY")}
            </div>
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          ></div>
        </article>
      </div>

      <div className="sidebar basis-full lg:basis-1/4 min-w-[240px]">
        <Sidebar />
      </div>
    </div>
  );
}

export default PostDetailPage;
