import React from "react";
import { gql } from "graphql-request";
import { IPost } from "@/app/interfaces";
import { getPostDetail } from "@/app/services/graphCms";
//import Image from "next/image";
import { Avatar, Image } from "@nextui-org/react";
import moment from "moment";
import Sidebar from "@/app/components/Sidebar";
import NextBreadcrumb, { ICrumb } from "@/app/components/Breadcrumb";
import CommentForm from "@/app/components/CommentForm";

async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post: IPost = await getPostDetail(params.slug);
  const crumbItems: ICrumb[] = [
    {
      name: post.categories[0].name,
      link: "/category/" + post.categories[0].slug,
    },
    { name: post.title },
  ];
  return (
    <div className="mx-auto w-full max-w-7xl">
      <NextBreadcrumb capitalizeLinks={true} listCrumbs={crumbItems} />
      <div className="flex w-full flex-col lg:flex-row gap-5 justify-between xl:gap-10 ">
        <div
          className="main flex flex-col basis-full gap-5 @container
          lg:flex-1 lg:gap-8 xl:gap-12 lg:max-w-[calc(100%-280px)]"
        >
          <article
            className="post border rounded-2xl shadow-md
           bg-white dark:bg-slate-700 dark:text-white"
          >
            <div className="post-image overflow-hidden">
              <Image
                className="object-cover  mx-auto shadow-md rounded-t-xl rounded-b-none"
                src={post.coverPhoto.url}
                alt={post.title}
                //width={800}
                //height={1200}
                //priority
                removeWrapper
              />
            </div>

            <div className="author flex justify-center gap-5 items-center w-full p-5">
              {post.author && (
                <div className="flex items-center gap-5">
                  <h5 className="text-xl font-semibold">
                    {post?.author?.name}
                  </h5>
                  {/* <Image
                  src={post.author.avatar.url}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  sizes="64"
                  className="object-cover rounded-full aspect-square shadow-md"
                /> */}
                  <Avatar
                    isBordered
                    size="lg"
                    color="success"
                    src={post?.author?.avatar.url}
                  />
                </div>
              )}

              <div className="post-date">
                {moment(post.createAt).format("DD/MM/YYYY")}
              </div>
            </div>

            <h1 className="page-title post-title border-b p-5 text-gradient">
              {post.title}
            </h1>

            <div
              className="post-content p-5 lg:p-8 xl:p-12"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            ></div>
          </article>

          <div className="post-comment border rounded-2xl shadow-md p-5 lg:p-8 xl:p-12 bg-white dark:bg-slate-700 dark:text-white">
            <CommentForm slug={params.slug} />
          </div>
        </div>

        <div className="sidebar basis-full lg:basis-1/4 min-w-[240px]">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
