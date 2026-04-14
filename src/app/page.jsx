import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/home/Banner";
import YourFriends from "@/components/home/YourFriends";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans">
      <Navbar />
      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-16 px-4 py-20 sm:px-6 lg:px-8">
        <Banner />
        <YourFriends />
      </section>
      <Footer />
    </main>
  );
}
