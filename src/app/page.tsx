import { connection } from "next/server";
import { HomeContent } from "@/components/home-content";
import { formatEntryDate } from "@/lib/entries";
import { sampleEntries } from "@/lib/sample-entries";

export default async function Home() {
  await connection();

  return (
    <HomeContent
      today={formatEntryDate(new Date())}
      sampleEntries={sampleEntries}
    />
  );
}
