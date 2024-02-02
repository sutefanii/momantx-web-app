import { Calendar } from "@/ui/calendar";
import { Header } from "@/ui/header";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-16">
        <section id="calendar">
          <Calendar />
        </section>
      </main>
    </>
  );
}
