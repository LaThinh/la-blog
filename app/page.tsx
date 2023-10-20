import PostGrid from "./components/PostGrid";
import { Button } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";

export default async function Home() {
  return (
    <div className="flex w-full flex-col md:flex-row gap-5 justify-between xl:gap-10 ">
      <div className="main flex flex-col w-full basis-full gap-5 md:flex-1 md:max-w-[calc(100%-260px)]">
        <PostGrid />

        <div className="my-10 flex justify-center">
          <Button color="primary">Load more</Button>
        </div>
      </div>
      <div className="sidebar basis-full md:basis-1/4 min-w-[240px]">
        <Sidebar />
      </div>
    </div>
  );
}
