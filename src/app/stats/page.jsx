import Footer from "@/components/Footer";
import FriendshipAnalytics from "@/components/stats/FriendshipAnalytics";
import Navbar from "@/components/Navbar";

const StatsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />
      <FriendshipAnalytics />
      <Footer />
    </main>
  );
};

export default StatsPage;
