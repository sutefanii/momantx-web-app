'use client'
import { Calendar } from "@/ui/calendar";
import { Header } from "@/ui/header";

export default function Home() {
  return (
    <>
      <Header pathName='home' />
      <main className="mt-16">
        <section id="calendar">
          <Calendar />
        </section>
      </main>
    </>
  );
}
