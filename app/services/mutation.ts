import request, { GraphQLClient, gql } from "graphql-request";
import { TCommentSchema } from "@/app/lib/types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_CONTENT || "";

// export const createComment = async (data: TCommentSchema) => {
//   const mutation = gql`
//     {
//         createComment(
//             data: {
//                 name: "${data.name}",
//                 email: "${data.email}",
//                 comment: "${data.comment}",
//                 post: {connect: {slug: "${data.slug}"}}
//             }
//           ) {
//             id
//             name
//             email
//             comment
//             createdAt
//           }
//         }

//   `;

//   console.log(mutation);

//   const createComment = await request(graphqlAPI, mutation);
//   return createComment;
// };

export const submitComment = async (formData: TCommentSchema) => {
  console.log(formData);

  const result = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(formData),
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      response.json();
    })
    .then(() => {
      console.log("response error");
    });

  //return result.json();
};
