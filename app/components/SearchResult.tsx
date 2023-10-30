"use client";

import React, { memo, useEffect, useState } from "react";
import { IPost } from "@/app/interfaces";
import { searchPostByQuery } from "@/app/services/graphCms";
import PostGrid from "@/app/components/PostGrid";

export function SearchResult({ query }: { query: string }) {
  const [result, setResult] = useState<IPost[]>([]);

  useEffect(() => {
    console.log("query: " + query);
    searchPostByQuery(query).then((result) => {
      setResult(result);
    });
  }, [query]);

  return (
    <div>
      {result && result.length > 0 && (
        <>
          render posts {query}
          <PostGrid posts={result} />
        </>
      )}
    </div>
  );
}

export default memo(SearchResult);
