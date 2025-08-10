"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

// This file contains server actions for handling form submissions or other server-side logic.

export async function handleSubmit(FormData: FormData) {
    // get user from session
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    // Check if user is authenticated
    if (!user) {
        // If not authenticated, redirect to the login page
        return redirect("api/auth/login");
    }

  // Extract data from the FormData object
    const title = FormData.get("title") as string;
    const content = FormData.get("content") as string;
    const url = FormData.get("url") as string;

  // Perform server-side operations, such as saving to a database
  await prisma.blogPost.create({
    data: {
      title: title,
      content: content,
      imageUrl: url,
        authorId: user.id,
        authorName: `${user.given_name} ${user.family_name}`,
        authorImage: user.picture || "",
    },
  });

  return redirect("/dashboard");
}