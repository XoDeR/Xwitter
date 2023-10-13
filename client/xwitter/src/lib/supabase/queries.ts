"use server";

import { supabaseServer } from ".";
import { Database } from "@/lib/supabase.types";
import { pool } from "../db";

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

const queryWithCurrentUserId = `SELECT tweets.*, profiles.username, profiles.full_name, COUNT(likes.id) AS likes_count,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes.tweet_id = tweets.id
        AND likes.user_id = $1
      ) AS user_has_liked
    FROM tweets
    LEFT JOIN likes ON tweets.id = likes.tweet_id
    JOIN profiles ON tweets.user_id = profiles.id
    GROUP BY tweets.id, profiles.username, profiles.full_name
    ORDER BY tweets.created_at DESC`;

const queryWithoutCurrentUserId = `SELECT tweets.*, profiles.username, profiles.full_name, COUNT(likes.id) AS likes_count
    FROM tweets
    LEFT JOIN likes ON tweets.id = likes.tweet_id
    JOIN profiles ON tweets.user_id = profiles.id
    GROUP BY tweets.id, profiles.username, profiles.full_name
    ORDER BY tweets.created_at DESC`;

export const getTweets = async (currentUserId?: string) => {
  let query = pool.query(queryWithoutCurrentUserId);

  if (currentUserId) {
    query = pool.query(queryWithCurrentUserId, [currentUserId]);
  }

  try {
    const res = await query;
    return { data: res.rows };
  } catch (error) {
    console.log(error);
  }
};

export const getLikesCount = async (tweetId: string) => {
  const res = await supabaseServer
    .from("likes")
    .select("id", { count: "exact" })
    .eq("tweet_id", tweetId);
  return res;
};

export const isLiked = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId?: string;
}) => {
  if (!userId) return false;
  const { data, error } = await supabaseServer
    .from("likes")
    .select("id")
    .eq("tweet_id", tweetId)
    .eq("user_id", userId)
    .single();
  return Boolean(data?.id);
};
