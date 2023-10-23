export interface IPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    html: string;
  };
  coverPhoto: IPhoto;
  categories: ICategory[];
  author: {
    name: string;
    avatar: IPhoto;
  };
  createAt: Date;
  comments?: IComment[];
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export interface IPhoto {
  id: string;
  url: string;
  fileName: string;
  width: number;
  height: number;
  stage?: string;
}

export interface IComment {
  id: string;
  name: string;
  email: string;
  comment: string;
  createdAt: Date;
}
