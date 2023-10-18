import PostGrid from "./components/PostGrid";
import { Button } from "@nextui-org/react";

export default async function Home() {
  return (
    <div>
      <PostGrid />

      <div className="my-10 flex justify-center">
        <Button color="primary">Load more</Button>
      </div>
    </div>
  );
}
