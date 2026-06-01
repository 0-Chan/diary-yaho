import type { Metadata } from "next";
import { EntriesList } from "@/components/entries-list";
import { sampleEntries } from "@/lib/sample-entries";

export const metadata: Metadata = {
  title: "모든 일기",
};

export default function EntriesPage() {
  return <EntriesList sampleEntries={sampleEntries} />;
}
