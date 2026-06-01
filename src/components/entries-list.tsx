"use client";

import Link from "next/link";
import { type DiaryEntry, getMoodLabel } from "@/lib/entries";
import { useStoredEntries } from "@/lib/use-stored-entries";

type EntriesListProps = {
  sampleEntries: DiaryEntry[];
};

export function EntriesList({ sampleEntries }: EntriesListProps) {
  const { entries } = useStoredEntries();
  const allEntries = [...entries, ...sampleEntries];

  return (
    <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-line border-b pb-5">
          <div>
            <Link href="/" className="text-sm font-semibold text-accent-strong">
              Diary Yaho
            </Link>
            <h1 className="mt-2 text-3xl font-semibold">모든 일기</h1>
          </div>
          <Link
            href="/entries/new"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            새 일기
          </Link>
        </header>

        <section className="grid gap-3">
          {allEntries.map((entry) => (
            <Link
              key={entry.id}
              href={`/entries/${entry.id}`}
              className="rounded-lg border border-line bg-surface p-5 shadow-sm transition hover:border-accent"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-foreground/60">
                    {entry.dateLabel}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">{entry.title}</h2>
                </div>
                <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold">
                  {getMoodLabel(entry.mood)}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-foreground/70">
                {entry.excerpt}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
