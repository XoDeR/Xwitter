import LeftSidebar from "./components/LeftSidebar";
import MainComponent from "./components/MainComponent";

import { BsSearch } from "react-icons/bs";

const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-[70vw] w-full h-full flex relative">
        {/* left sidebar, nav/header */}
        <LeftSidebar />
        {/* main */}
        <MainComponent />
        {/* right section */}
        <section className="w-full sticky top-2 no-scrollbar overflow-y-auto mt-2 flex flex-col items-stretch h-screen px-6">
          <div className="sticky top-2">
            <div className="relative w-full h-full group">
              <input
                id="searchBox"
                type="text"
                placeholder="Search Xwitter"
                className="outline-none peer focus:border-primary focus:border bg-neutral-900/90 w-full h-full rounded-xl py-4 pl-14 pr-4"
              />
              <label
                htmlFor="searchBox"
                className="absolute top-0 left-0 h-full flex items-center justify-center p-4 text-gray-500 peer-focus:text-primary"
              >
                <BsSearch className="w-5 h-5" />
              </label>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
            <h3 className="font-bold text-xl my-4 px-4">
              What&apos;s happening
            </h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200"
                >
                  <div className="font-bold text-lg">#trending{i + 1}</div>
                  <div className="text-xs text-neutral-400">56.7k</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4 sticky top-0">
            <h3 className="font-bold text-xl my-4 px-4">Who to follow</h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="hover:bg-white/10 p-4 flex items-center last:rounded-b-xl transition duration-200"
                >
                  <div className="w-10 h-10 bg-neutral-600 rounded-full"></div>
                  <div className="flex flex-col space-y-2">
                    <div>Other user</div>
                    <div>@otheruser9876</div>
                  </div>
                  <div>
                    <button className="rounded-full px-6 py-2 bg-white text-neutral-950">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </section>
      </div>
    </div>
  );
};

export default Home;
