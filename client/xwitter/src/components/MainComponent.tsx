import ComposeTweet from "./server-components/compose-tweet";
import { getTweets } from "@/lib/supabase/queries";
import Tweet from "./client-components/tweet";

const MainComponent = async () => {
  const res = await getTweets();

  return (
    <main className="flex w-full xl:w-[50%] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-4 space-x-2 border-gray-600 relative">
        <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
        <ComposeTweet />
      </div>
      <div className="flex flex-col w-full">
        {res?.error && <div>Something is wrong with the server</div>}
        {res?.data &&
          res.data.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
      </div>
    </main>
  );
};

export default MainComponent;
