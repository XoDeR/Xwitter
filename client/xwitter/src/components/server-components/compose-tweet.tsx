import React from "react";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { Database } from "@/lib/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import FormClientComponent from "./FormClientComponent";

const ComposeTweet = () => {
  async function submitTweet(formData: FormData) {
    "use server";

    const tweet = formData.get("tweet");

    if (!tweet) return;

    const supabase = createServerComponentClient<Database>({
      cookies,
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) return;

    const { data, error } = await supabase.from("tweets").insert({
      user_id: userData.user.id,
      text: tweet.toString(),
      id: randomUUID(),
    });

    return { data, error };
  }

  return <FormClientComponent serverAction={submitTweet} />;
};

export default ComposeTweet;
