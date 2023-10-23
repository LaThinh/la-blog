import type { NextApiRequest, NextApiResponse } from "next";

import { GraphQLClient, gql } from "graphql-request";
//import { TCommentSchema } from "@/app/lib/types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_CONTENT || "";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  //const data = request.body;
  console.log(request.body);

  const variables: {
    name: string;
    email: string;
    comment: string;
    slug: string;
  } = request.body;

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const mutation = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
        name
        email
        comment
        createdAt
      }
    }
  `;

  await graphQLClient.request(mutation, variables);

  //response.status(200).json({ message: 'Hello from Next.js!' })

  return response.status(200).json({ success: true });
}
