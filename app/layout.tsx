import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header, Footer } from "@/app/components";
import LoadingBar from "./components/LoadingBar";

const inter = Inter({
  subsets: ["latin"],
});
// const roboto = Roboto_Condensed({
//   subsets: ["latin"],
//   weight: ["300", "400", "700"],
// });

export const metadata: Metadata = {
  title: "La Blog - Phật pháp, Nhiếp ảnh và Lập trình | Next App",
  description:
    "Chào mừng bạn đến với Blog của La. Nơi chia sẻ những kiến thức về lập trình, Nhiếu ảnh và Phật Pháp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${inter.className} 
        bg-gradient-to-t from-stone-200 to-neutral-100
      dark:bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:to-gray-600 dark:bg-gradient-to-t
      `}
      >
        <Providers>
          <Header />
          <LoadingBar />
          <main className=" m-auto p-3 md:p-5 lg:p-8 xl:p-12 xl:container min-h-screen flex flex-col items-center justify-between">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
