"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "@/app/icons/Icons";
import { IPost } from "@/app/interfaces";
import { searchPostByQuery } from "@/app/services/graphCms";
import PostGrid from "@/app/components/PostGrid";
import Loading from "@/app/components/Loading";

//export const dynamic = "auto";

export function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const [results, setResults] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const keywordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Gọi API tìm kiếm với query hiện tại và cập nhật kết quả
    const searchPosts = async () => {
      try {
        setIsLoading(true);
        //const response = await fetch(`/api/search?query=${query}`);
        const response = await searchPostByQuery(query);
        const data = await response;
        console.log(data);
        setResults(data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error searching posts:", error);
      }
    };
    searchPosts();
  }, [query]);

  // const handleInputChange = (event: any) => {
  //   setQuery(event.target.value);
  // };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setQuery(event.target.value);
      router.replace("/search?q=" + query, { scroll: false });
    }
    if (event.keyCode === 32) {
      setQuery(event.target.value);
    }
  };

  const handleSearch = () => {
    // Gọi API tìm kiếm khi người dùng nhấn nút tìm kiếm
    const key = keywordRef.current?.value;
    if (key && key.length > 0) {
      setQuery(key);
    }
    console.log(key);
    router.replace("/search?q=" + query, { scroll: false });
  };

  return (
    <div className="search-page flex flex-col gap-5 w-full">
      <h1 className="page-title">{`Search Page: keyword="${query}"`}</h1>

      <div className="search-header">
        <div className="form-group flex gap-0 relative w-full max-w-md mx-auto my-5">
          <Input
            radius="full"
            name="keyword"
            variant="faded"
            color="primary"
            defaultValue={query ? query : ""}
            onKeyDown={handleKeyDown}
            ref={keywordRef}
          />
          <Button
            type="submit"
            radius="full"
            color="primary"
            aria-label="Search"
            className="!min-w-[100px] absolute top-0 bottom-0 right-0 z-20"
            onClick={handleSearch}
            endContent={<SearchIcon width="20" height="20" />}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="search-results w-full">
        {isLoading ? (
          <Loading text={`Searching ${query} ...`} />
        ) : (
          <>
            {results.length == 0 && (
              <h3>{`Not found Post with Keyword = ${query}`}</h3>
            )}
            <PostGrid posts={results} />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
