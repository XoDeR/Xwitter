"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from ".";
import { randomUUID } from "crypto";
import { db } from "../db";
import { likes } from "../db/schema";

export const likeTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  console.log({ tweetId, userId });

  const res = await db
    .insert(likes)
    .values({
      tweetId,
      userId,
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(res);

  revalidatePath("/");
};

export const unlikeTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const { data, error } = await supabaseServer
    .from("likes")
    .delete()
    .eq("tweet_id", tweetId)
    .eq("user_id", userId);

  revalidatePath("/");
  console.log(data, error);
};
