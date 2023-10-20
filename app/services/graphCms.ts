import request, { GraphQLClient, gql } from "graphql-request";
import { ICategory, IPost } from "@/app/interfaces";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";

export const getPosts = async () => {
  const query = gql`
    {
      posts(orderBy: datePublished_DESC) {
        createdAt
        datePublished
        id
        slug
        title
        updatedAt
        excerpt
        author {
          name
          id
          avatar {
            fileName
            url
          }
        }
        coverPhoto {
          publishedAt
          createdBy {
            id
          }
          url
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const { posts }: { posts: IPost[] } = await request(graphqlAPI, query);
  return posts;
};

export const getLastPosts = async (limit?: number) => {
  const first = limit ? limit : 3;

  const query = gql`
    {
      posts(orderBy: datePublished_DESC, first: ${first}) {
        createdAt
        datePublished
        id
        slug
        title
        updatedAt
        coverPhoto {
          url
        }        
      }
    }
  `;

  const { posts }: { posts: IPost[] } = await request(graphqlAPI, query);
  return posts;
};

export const getPostDetail = async (slug: string): Promise<IPost> => {
  const query = gql`
    {
      post(where: {slug: "${slug}"}) {
        id
        title
        slug
        createdAt
        datePublished
        content {
          html
        }
        author {
          name
          id
          avatar {
            fileName
            url
          }
        }
        coverPhoto {
          url
        }
      }
    }
  `;

  const { post }: { post: IPost } = await request(graphqlAPI, query);
  return post;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const query = gql`
    {
      categories {
        id
        name
        slug
      }
    }
  `;

  const { categories }: { categories: ICategory[] } = await request(
    graphqlAPI,
    query
  );
  return categories;
};

export const getCategoryBySlug = async (slug: string): Promise<ICategory[]> => {
  const query = gql`
    {
      categories (where: {slug: "${slug}"}) {
        id
        name
        slug
      }
    }
  `;

  //console.log(query);

  const { categories }: { categories: ICategory[] } = await request(
    graphqlAPI,
    query
  );

  return categories;
};

export const getPostCategory = async (slug: string): Promise<IPost[]> => {
  const query = gql`
    {
      posts(where: {categories_some: {slug: "${slug}"}}) {
        id
        title
        slug
        createdAt
        datePublished
        author {
          name
          id
          avatar {
            fileName
            url
          }
        }
        coverPhoto {
          url
        }
        categories {
          id
          name
          slug
        }
      }
    }
  `;

  const { posts }: { posts: IPost[] } = await request(graphqlAPI, query);
  return posts;
};
