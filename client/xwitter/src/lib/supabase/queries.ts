"use server";

import { supabaseServer } from ".";
import { Database } from "@/lib/supabase.types";

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

export const getTweets = async () => {
  return await supabaseServer
    .from("tweets")
    .select("*, profiles (full_name, username)")
    .returns<TweetType[]>();
};
