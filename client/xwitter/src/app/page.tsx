import LeftSidebar from "@/components/LeftSidebar";
import MainComponent from "@/components/MainComponent";
import RightSection from "@/components/RightSection";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/lib/supabase.types";

export const dynamic = "force-dynamic";

const Home = async () => {
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const { data, error } = await supabase.auth.getUser();
  // console.log({ data, error });

  return (
    <div className="w-full h-full flex justify-center items-center text-white relative bg-black">
      <div className="max-w-[70vw] w-full h-full flex relative">
        {/* left sidebar, nav/header */}
        <LeftSidebar />
        {/* main */}
        <MainComponent />
        {/* right section */}
        <RightSection />
      </div>
    </div>
  );
};

export default Home;
