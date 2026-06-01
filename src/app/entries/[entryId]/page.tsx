import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: entry?.title ?? "일기",
  };
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { entryId } = await params;
  const entry = findSampleEntry(entryId);

  if (!entry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="border-line border-b pb-5">
          <Link
            href="/entries"
            className="text-sm font-semibold text-accent-strong"
          >
            모든 일기
          </Link>
          <p className="mt-5 text-sm text-foreground/60">{entry.dateLabel}</p>
          <h1 className="mt-2 text-3xl font-semibold">{entry.title}</h1>
          <span className="mt-4 inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold">
            {entry.mood}
          </span>
        </header>

        <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
          <p className="whitespace-pre-line text-base leading-8 text-foreground/80">
            {entry.body}
          </p>
        </div>
      </article>
    </main>
  );
}
