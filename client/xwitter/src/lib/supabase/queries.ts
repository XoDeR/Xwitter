"use server";

import { supabaseServer } from ".";
import { Database } from "@/lib/supabase.types";
import { db } from "../db";
import { likes, profiles, tweets } from "../db/schema";
import { and, desc, eq, exists } from "drizzle-orm";

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

// const queryWithCurrentUserId = `SELECT tweets.*, profiles.username, profiles.full_name, COUNT(likes.id) AS likes_count,
//       EXISTS (
//         SELECT 1
//         FROM likes
//         WHERE likes.tweet_id = tweets.id
//         AND likes.user_id = $1
//       ) AS user_has_liked
//     FROM tweets
//     LEFT JOIN likes ON tweets.id = likes.tweet_id
//     JOIN profiles ON tweets.user_id = profiles.id
//     GROUP BY tweets.id, profiles.username, profiles.full_name
//     ORDER BY tweets.created_at DESC`;

// const queryWithoutCurrentUserId = `SELECT tweets.*, profiles.username, profiles.full_name, COUNT(likes.id) AS likes_count
//     FROM tweets
//     LEFT JOIN likes ON tweets.id = likes.tweet_id
//     JOIN profiles ON tweets.user_id = profiles.id
//     GROUP BY tweets.id, profiles.username, profiles.full_name
//     ORDER BY tweets.created_at DESC`;

export const getTweets = async (currentUserId?: string) => {
  try {
    // const res = await db.query.tweets.findMany({
    //   with: {
    //     profile: {
    //       columns: {
    //         username: true,
    //         fullName: true,
    //       },
    //     },
    //   },
    // });
    let err = "";
    const res = await db
      .select()
      .from(tweets)
      .leftJoin(likes, eq(tweets.id, likes.tweetId))
      .innerJoin(profiles, eq(tweets.userId, profiles.id))
      .orderBy(desc(tweets.createdAt))
      .limit(1)
      .catch(() => {
        err = "Error fetching tweets";
      });

    return { data: res, error: err };
  } catch (error) {
    return { error: "Something is wrong with querying the db." };
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
