import React from "react";
import { IPost } from "@/app/interfaces";
import PostCard from "@/app/components/PostCard";
import { gql } from "graphql-request";
//import { getPosts } from "@/app/services";
import { getPosts } from "@/app/services/graphCms";

// async function getPostsDemo() {
//   const queryPosts = gql`
//     {
//       posts {
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
//     }
//   `;

//   const { posts }: { posts: IPost[] } = await graphBlog.request(queryPosts);
//   return posts;
// }

async function PostGrid({ posts }: { posts?: IPost[] }) {
  if (!posts) {
    posts = await getPosts();
  }
  //console.log(posts);
  return (
    <div
      className="post-list grid gap-5 grid-cols-2 
    md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8"
    >
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
}

export default PostGrid;
