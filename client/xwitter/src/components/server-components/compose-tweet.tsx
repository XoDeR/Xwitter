import React from "react";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { Database } from "@/lib/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import ComposeTweetForm from "../client-components/compose-tweet-form";
import { revalidatePath } from "next/cache";

const ComposeTweet = () => {
  async function submitTweet(formData: FormData) {
    "use server";

    const tweet = formData.get("tweet");

    if (!tweet) return;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseSecretKey)
      return {
        error: {
          message: "Supabase credentials are not present",
        },
      };

    const supabaseServer = new SupabaseClient(supabaseUrl, supabaseSecretKey);

    const supabaseClient = createServerComponentClient<Database>({
      cookies,
    });

    const { data: userData, error: userError } =
      await supabaseClient.auth.getUser();

    if (userError) return;

    const { data, error } = await supabaseServer.from("tweets").insert({
      user_id: userData.user.id,
      text: tweet.toString(),
      id: randomUUID(),
    });

    revalidatePath("/");

    return { data, error };
  }

  return <ComposeTweetForm serverAction={submitTweet} />;
};

export default ComposeTweet;
