"use server";

import { Database } from "@/lib/supabase.types";

import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoStatsChart, IoShareOutline } from "react-icons/io5";

import { toast } from "sonner";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { TweetType, getLikesCount, isLiked } from "@/lib/supabase/queries";
import LikeButton from "./like-button";
import { Tweet, Profile } from "@/lib/db/schema";

dayjs.extend(relativeTime);

type TweetProps = {
  tweet: {
    userProfile: Profile;
    tweetDetails: Tweet;
  };
};

const Tweet = async ({ tweet, currentUserId }: TweetProps) => {
  console.log(tweet);

  return (
    <div className="border-b-[0.5px] border-gray-600 p-2 flex space-x-4">
      <div>
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-1 w-full">
            <div className="font-bold">{tweet.userProfile.fullName ?? ""}</div>
            <div className="text-gray-500">@{tweet.userProfile.username}</div>
            <div className="text-gray-500">
              <BsDot />
            </div>
            <div className="text-gray-500">
              {dayjs(tweet.tweetDetails.createdAt).fromNow()}
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
        <div className="text-white text-base">{tweet.tweetDetails.text}</div>
        <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2"></div>
        <div className="flex items-center justify-start space-x-20 mt-2 w-full">
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <BsChat />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <AiOutlineRetweet />
          </div>
          <LikeButton
            tweetId={tweet.tweetDetails.id}
            likesCount={0}
            userHasLiked={false}
          />
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <IoStatsChart />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <IoShareOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
