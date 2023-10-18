import React from "react";
import { gql } from "graphql-request";
import { IPost } from "@/app/interfaces";
import { getPostDetail } from "@/app/services/graphCms";
//import Image from "next/image";
import { Image } from "@nextui-org/react";

// async function getPost(slug: string) {
//   const queryPostDetail = gql`
//   {
//     post(where: {slug: "${slug}"}) {
//         id
//         title
//         slug
//         createdAt
//         datePublished
//         content {
//           html
//         }
//         author {
//           name
//           id
//           avatar {
//             fileName
//             url
//           }
//         }
//         coverPhoto {
//           url
//         }
//       }
//   }
// `;

//   const { post }: { post: IPost } = await graphBlog.request(queryPostDetail);
//   return post;
// }

async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post: IPost = await getPostDetail(params.slug);

  return (
    <div>
      <h1 className="page-title post-title">{post.title}</h1>
      <Image
        className="mx-auto mb-10 shadow-md "
        src={post.coverPhoto.url}
        alt={post.title}
        removeWrapper
      />
      <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
    </div>
  );
}

export default PostDetailPage;
