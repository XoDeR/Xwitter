import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
  profiles: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "full_name" | "username"
  >;
};

export const getTweets = async () => {
  if (supabaseUrl && supabaseSecretKey) {
    const supabaseServer = new SupabaseClient(supabaseUrl, supabaseSecretKey);

    return await supabaseServer
      .from("tweets")
      .select("*, profiles (full_name, username)")
      .returns<TweetType[]>();
  }
};
