import request, { GraphQLClient, gql } from "graphql-request";
import { ICategory, IComment, IPost } from "@/app/interfaces";

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

export const getPostsPage = async (
  page: number,
  limit: number
): Promise<IPost[]> => {
  const query = gql`
    {
      posts(orderBy: datePublished_DESC, first: ${limit}, skip: ${
    limit * page
  }) {
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
        excerpt
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
        excerpt
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
        categories {
          name
          slug
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
      posts(orderBy: datePublished_DESC, where: {categories_some: {slug: "${slug}"}}) {
        id
        title
        slug
        excerpt
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

export const getCommentBySlug = async (slug: string): Promise<IComment[]> => {
  const query = gql`
    {
      comments (where: {post: {slug: "${slug}"}}) {
        id
        name
        email
        comment
        createdAt
      }
    }
  `;

  const { comments }: { comments: IComment[] } = await request(
    graphqlAPI,
    query
  );

  return comments;
};
