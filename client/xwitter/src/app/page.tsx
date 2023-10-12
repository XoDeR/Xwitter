import LeftSidebar from "@/components/LeftSidebar";
import MainComponent from "@/components/MainComponent";
import RightSection from "@/components/RightSection";

// caching disabled
export const revalidate = 0;

const Home = async () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-white relative bg-black">
      <div className="xl:max-w-[70vw] w-full h-full flex relative">
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
