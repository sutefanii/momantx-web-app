import type { Metadata } from "next";
import "@/styles/core.css"


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
      <body className="bg-darkBg">{children}</body>
    </html>
  );
}
