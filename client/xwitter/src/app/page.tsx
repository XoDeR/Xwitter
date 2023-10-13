import LeftSidebar from "@/components/left-sidebar";
import MainComponent from "@/components/main-component";
import RightSection from "@/components/right-section";

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
