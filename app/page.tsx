import PostGrid from "./components/PostGrid";
import { Button } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";

export default async function Home() {
  return (
    <div className="flex w-full flex-col lg:flex-row gap-5 justify-between xl:gap-10 ">
      <div className="main flex flex-col w-full basis-full gap-5 lg:flex-1 lg:max-w-[calc(100%-300px)]">
        <PostGrid />

        <div className="my-10 flex justify-center">
          <Button color="primary">Load more</Button>
        </div>
      </div>
      <div className="sidebar basis-full lg:basis-1/4 min-w-[280px]">
        <Sidebar />
      </div>
    </div>
  );
}
