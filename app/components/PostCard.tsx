// "use client";

import React from "react";
import { IPost } from "../interfaces";
import { Button, Card, CardBody } from "@nextui-org/react";

import Link from "next/link";
import Image from "next/image";

function PostCard({ post }: { post: IPost }) {
  //console.log(post);

  return (
    <div className="post-card">
      <Card>
        <Link href={`/post/${post.slug}`}>
          <div className="post-image relative  overflow-hidden">
            <Image
              className="object-cover aspect-[2/3] max-h-[450px]  max-w-none w-full ease-in-out duration-200 hover:opacity-90 hover:scale-110"
              src={post.coverPhoto.url}
              alt={post.title}
              width={360}
              height={540}
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
        <CardBody>
          <Link href={`/post/${post.slug}`}>
            <h3 className="text-xl font-semibold h-12 leading-6 mb-4 line-clamp-2	">
              {post.title}
            </h3>
          </Link>
          <p className="line-clamp-3">{post.excerpt}</p>

          <ul className="flex gap-2">
            {post?.categories &&
              post.categories.map((category, index) => (
                <li key={index}>
                  <Button
                    className="border"
                    color="primary"
                    size="sm"
                    variant="ghost"
                    as={Link}
                    href={`/category/${category.slug}`}
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export default PostCard;
