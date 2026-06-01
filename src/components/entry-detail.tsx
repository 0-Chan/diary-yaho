"use client";

import Link from "next/link";
import {
  type DiaryEntry,
  getMoodLabel,
  getVisibilityLabel,
} from "@/lib/entries";
import { useStoredEntries } from "@/lib/use-stored-entries";

type EntryDetailProps = {
  entryId: string;
  sampleEntry: DiaryEntry | null;
};

export function EntryDetail({ entryId, sampleEntry }: EntryDetailProps) {
  const { entries, isLoaded } = useStoredEntries();
  const entry =
    sampleEntry ?? entries.find((storedEntry) => storedEntry.id === entryId);

  if (!entry && !isLoaded) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-lg border border-line bg-surface p-5 shadow-sm">
          일기를 불러오는 중입니다.
        </div>
      </main>
    );
  }

  if (!entry) {
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
            <h1 className="mt-5 text-3xl font-semibold">
              일기를 찾을 수 없습니다
            </h1>
          </header>

          <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
            <p className="text-base leading-7 text-foreground/75">
              저장된 브라우저가 다르거나 삭제된 일기입니다.
            </p>
            <Link
              href="/entries/new"
              className="mt-5 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white"
            >
              새 일기 쓰기
            </Link>
          </div>
        </article>
      </main>
    );
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
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold">
              {getMoodLabel(entry.mood)}
            </span>
            <span className="inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold">
              {getVisibilityLabel(entry.visibility)}
            </span>
          </div>
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
