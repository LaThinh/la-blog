//import PostGrid from "./components/PostGrid";
import { Button } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import LatestPostsGrid from "./components/LatestPostsGrid";
import { IPost } from "@/app/interfaces";
import { getPostsPage } from "@/app/services/graphCms";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

export default async function Home() {
  const pageSize = 6;
  const posts: IPost[] = await getPostsPage(0, pageSize);

  return (
    <div className="flex w-full flex-col md:flex-row gap-5 justify-between xl:gap-10 ">
      <div className="main flex flex-col w-full basis-full gap-5 md:flex-1 md:max-w-[calc(100%-260px)]">
        {posts && posts.length > 0 && (
          <LatestPostsGrid
            pageSize={pageSize}
            pageAutoLoad={4}
            postData={posts}
          />
        )}
      </div>
      <div className="sidebar basis-full md:basis-1/4 min-w-[240px]">
        <Sidebar />
      </div>
    </div>
  );
}
