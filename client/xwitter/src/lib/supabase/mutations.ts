"use server";

import { supabaseServer } from ".";
import { randomUUID } from "crypto";

export const likeTweet = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const { data, error } = await supabaseServer
    .from("likes")
    .insert({ id: randomUUID(), tweet_id: tweetId, user_id: userId });

  console.log(data, error);
};