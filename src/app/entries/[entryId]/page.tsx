import type { Metadata } from "next";
import { EntryDetail } from "@/components/entry-detail";
import { findSampleEntry } from "@/lib/sample-entries";

type EntryPageProps = {
  params: Promise<{
    entryId: string;
  }>;
};

export async function generateMetadata({
  params,
}: EntryPageProps): Promise<Metadata> {
  const { entryId } = await params;
  const entry = findSampleEntry(entryId);

  return {
    title: entry?.title ?? "편지",
  };
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { entryId } = await params;
  const entry = findSampleEntry(entryId);

  return <EntryDetail entryId={entryId} sampleEntry={entry ?? null} />;
}
