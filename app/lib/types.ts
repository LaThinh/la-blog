import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .nonempty("Please enter your name")
    .min(5, "Name Min Length 5 characters")
    .max(60),
  email: z
    .string()
    .email("Email format wrong")
    .min(8, "Email Min Length 8 characters"),
  comment: z
    .string()
    .nonempty("Please enter your comments")
    .min(10, "Comment min 10 characters"),
  slug: z.string(),
  //save_info: z.boolean().default(false),
});

export type TCommentSchema = z.infer<typeof formSchema>;
