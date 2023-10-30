"use client";
import { Button, Input } from "@nextui-org/react";
import React, { FormEvent } from "react";
import { SearchIcon } from "@/app/icons/Icons";
import { useRouter } from "next/navigation";

export default function WidgetSearch() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //setIsLoading(true) // Set loading to true when the request starts

    try {
      const formData = new FormData(event.currentTarget);

      router.push("/search/?q=" + formData.get("q"));
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error);
    } finally {
      //setIsLoading(false) // Set loading to false when the request completes
    }
  }

  return (
    <div className="widget">
      <h3 className="widget-title">Search</h3>
      <div className="widget-content">
        <form className="box-search" onSubmit={onSubmit}>
          <div className="form-field flex">
            <Input
              name="q"
              radius="full"
              color="primary"
              placeholder="Search..."
              classNames={{
                mainWrapper: "pr-0 border-green-300",
                innerWrapper: "p-0 border-red-300",
                inputWrapper: ["pr-0 border-green-300"],
                // input: "p-0 border-red-300",
              }}
              endContent={
                // <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                <Button
                  type="submit"
                  radius="full"
                  color="primary"
                  aria-label="Search"
                  className="!min-w-[100px]"
                  endContent={<SearchIcon width="32" height="32" />}
                >
                  Search
                </Button>
              }
            />
            {/* <Button
              type="submit"
              radius="full"
              color="primary"
              aria-label="Search"
              className="!min-w-32"
              endContent={<SearchIcon width="64" height="64" />}
            >
              Search
            </Button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
