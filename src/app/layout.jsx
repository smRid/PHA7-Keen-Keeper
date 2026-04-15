import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "KeenKeeper",
  description:
    "Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
