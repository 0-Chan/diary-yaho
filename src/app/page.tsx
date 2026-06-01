import { HomeContent } from "@/components/home-content";
import { formatEntryDate } from "@/lib/entries";
import { sampleEntries } from "@/lib/sample-entries";

export default function Home() {
  return (
    <HomeContent
      today={formatEntryDate(new Date())}
      sampleEntries={sampleEntries}
    />
  );
}
