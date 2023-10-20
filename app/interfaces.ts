export interface IPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    html: string;
  };
  coverPhoto: iPhoto;
  categories: ICategory[];
  author: {
    name: string;
    avatar: iPhoto;
  };
  createAt: Date;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export interface iPhoto {
  id: string;
  url: string;
  fileName: string;
  width: number;
  height: number;
  stage?: string;
}
