"use client";

import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCommentSchema, formSchema } from "@/app/lib/types";
import { submitComment } from "../services/mutation";
import { IComment } from "@/app/interfaces";
import { getCommentBySlug } from "../services/graphCms";
import moment from "moment";
import { comment } from "postcss";

export default function CommentForm({ slug }: { slug: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
  } = useForm<TCommentSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [isSaveData, setIsSaveData] = React.useState(false);
  const [comments, setComments] = React.useState<IComment[]>([]);

  const saveLocalStorage = (data: TCommentSchema) => {
    if (isSaveData) {
      localStorage.setItem("comment_name", data.name);
      localStorage.setItem("comment_email", data.email);
    } else {
      localStorage.removeItem("comment_name");
      localStorage.removeItem("comment_email");
    }
  };

  const getComments = async () => {
    const commentData = await getCommentBySlug(slug);
    setComments(commentData);
  };

  useEffect(() => {
    let commentName = localStorage.getItem("comment_name");
    let commentEmail = localStorage.getItem("comment_email");
    if (commentName && commentEmail) {
      setValue("name", commentName);
      setValue("email", commentEmail);
      setIsSaveData(true);
    } else {
      setIsSaveData(false);
    }

    getComments();
  }, []);

  useEffect(() => {
    getComments();
  }, [isSubmitting]);

  const onSubmit = async (formData: TCommentSchema) => {
    saveLocalStorage(formData);

    try {
      const response = await fetch(`/api/comment/add`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        console.log(result.data);
      } else {
        console.log(result.error);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 @container">
      {comments && comments.length > 0 && (
        <div className="comment-list">
          <h3 className="mb-5 text-xl font-semibold text-gradient-blue">
            Comments:
          </h3>
          <ul className="comments flex flex-col gap-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="comment-item bg-gray-100  dark:bg-slate-700 border px-5 py-3 rounded-lg"
              >
                <div className="comment-header flex flex-wrap justify-between mb-2">
                  <strong className="comment-name font-semibold">
                    {comment.name}
                  </strong>
                  <div className="comment-date text-xs">
                    {moment(comment.createdAt).format("DD/MM/YYYY -  HH:mm:ss")}
                  </div>
                </div>

                <p className="comment-content text-sm">{comment.comment}</p>
              </div>
            ))}
          </ul>
        </div>
      )}

      <div className="comment-form">
        <h3 className="text-xl font-semibold mb-5 text-gradient-blue">
          Add comment
        </h3>

        <form
          className="flex flex-wrap gap-4 justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className="hidden"
            type="hidden"
            {...register("slug")}
            value={slug}
          />
          <div className="form-field flex flex-col w-full gap-2">
            <Textarea
              label="Comment"
              {...register("comment")}
              ///labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your comment"
              minRows={5}
              isInvalid={errors.comment ? true : false}
              errorMessage={errors?.comment?.message}
              classNames={{
                inputWrapper: "dark:border-white dark:color-white",
                label: "dark:text-white",
              }}
            />
          </div>
          <div className="form-field flex flex-col w-full gap-2 @lg:w-[48%]">
            <Input
              type="text"
              label="Your Name"
              {...register("name")}
              //labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your name"
              isInvalid={errors.name ? true : false}
              errorMessage={errors?.name?.message}
              classNames={{
                inputWrapper: "dark:border-white dark:color-white",
                label: "dark:text-white",
              }}
            />
            {/* {errors.name && <p className="text-red-500">{errors.name.message}</p>} */}
          </div>
          <div className="form-field flex flex-col w-full gap-2 @lg:w-[48%] ">
            <Input
              type="email"
              label="Email"
              {...register("email")}
              //labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your email"
              isInvalid={errors.email ? true : false}
              errorMessage={errors?.email?.message}
              classNames={{
                input: "!bg-transparent",
                inputWrapper: "dark:border-white dark:color-white",
                label: "dark:text-white",
              }}
            />
          </div>

          <Checkbox isSelected={isSaveData} onValueChange={setIsSaveData}>
            Save information for next comments
          </Checkbox>

          <div className="form-field flex w-full justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              color="primary"
              radius="full"
              size="lg"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              {isSubmitting ? "Adding Comment" : "Add Comment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
