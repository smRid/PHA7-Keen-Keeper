import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import YourFriends from "@/components/home/YourFriends";

const FriendsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-20 sm:px-6 lg:px-8">
        <YourFriends />
      </section>
      <Footer />
    </main>
  );
};

export default FriendsPage;
