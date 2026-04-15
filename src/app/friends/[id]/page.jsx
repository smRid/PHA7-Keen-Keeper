import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FriendDetails from "@/components/friends/FriendDetails";
import { getFriendById } from "@/lib/friends";
import { notFound } from "next/navigation";

const FriendsDetailsPage = async ({ params }) => {
  const { id } = await params;
  const friend = await getFriendById(id);

  if (!friend) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />
      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <FriendDetails friend={friend} />
      </section>
      <Footer />
    </main>
  );
};

export default FriendsDetailsPage;
