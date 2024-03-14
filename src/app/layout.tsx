import type { Metadata } from "next";
import "@/styles/core.css"
import Provider from "@/lib/providers/provider";


export const metadata: Metadata = {
  title: "МомантХ",
  description: "Погрузитесь в увлекательное путешествие в историю Беларуси 20-го века!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-darkBg overflow-x-hidden dark:bg-white">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
