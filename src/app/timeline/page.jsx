import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/timeline/Timeline";

const TimelinePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />
      <Timeline />
      <Footer />
    </main>
  );
};

export default TimelinePage;
