import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const variables: {
    name: string;
    email: string;
    comment: string;
    slug: string;
  } = request.body;

  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_CONTENT || "";
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_BLOG_TOKEN}`,
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
      }
    }
  `;

  try {
    await graphQLClient.request(mutation, variables).then((response: any) => {
      res.status(200).json({
        success: true,
        data: response.createComment,
      });
    });
  } catch (error: any) {
    res.status(error.response.status).json({
      success: false,
      message: error.response.errors[0].message,
      error: error.response,
    });
  }
}
