export interface IPost {
  id: string;
  title: string;
  content: {
    html: string;
  };
  slug: string;
  coverPhoto: {
    url: string;
  };
  author: {
    name: string;
    avatar: string;
  };
  categories?: ICategory[];
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
}
