"use client";

import Link from "next/link";
import {
  EntryWorkspace,
  moodPillClassName,
  PageHeader,
  primaryActionClassName,
  secondaryActionClassName,
  surfaceLinkCardClassName,
  textLinkClassName,
  WorkspaceRailPanel,
} from "@/components/entry-workspace";
import { type DiaryEntry, getMoodLabel } from "@/lib/entries";
import { useStoredEntries } from "@/lib/use-stored-entries";

type EntriesListProps = {
  sampleEntries: DiaryEntry[];
};

export function EntriesList({ sampleEntries }: EntriesListProps) {
  const { entries } = useStoredEntries();
  const allEntries = [...entries, ...sampleEntries];
  const latestEntry = allEntries[0];

  return (
    <EntryWorkspace
      mobileHeader={
        <PageHeader
          actions={
            <Link href="/entries/new" className={primaryActionClassName}>
              새 편지
            </Link>
          }
          eyebrow={
            <Link href="/" className={textLinkClassName}>
              Diary Yaho
            </Link>
          }
          title="우편함"
        />
      }
      rail={
        <WorkspaceRailPanel
          actions={
            <>
              <Link href="/entries/new" className={primaryActionClassName}>
                새 편지
              </Link>
              <Link href="/" className={secondaryActionClassName}>
                홈
              </Link>
            </>
          }
          eyebrow={
            <Link href="/" className={textLinkClassName}>
              Diary Yaho
            </Link>
          }
          meta={`${allEntries.length}개의 편지`}
          title="우편함"
        >
          {latestEntry && (
            <dl className="grid gap-4">
              <div>
                <dt className="text-sm text-foreground/60">최근 편지</dt>
                <dd className="mt-1 text-base font-semibold">
                  {latestEntry.dateLabel}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-foreground/60">기분 우표</dt>
                <dd className="mt-1 text-base font-semibold">
                  {getMoodLabel(latestEntry.mood)}
                </dd>
              </div>
            </dl>
          )}
        </WorkspaceRailPanel>
      }
      size="wide"
    >
      <section aria-label="편지 목록" className="grid gap-3">
        {allEntries.map((entry) => (
          <Link
            key={entry.id}
            href={`/entries/${entry.id}`}
            className={surfaceLinkCardClassName}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-foreground/60">{entry.dateLabel}</p>
                <h2 className="mt-2 text-xl font-semibold">{entry.title}</h2>
              </div>
              <span className={moodPillClassName}>
                {getMoodLabel(entry.mood)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground/70">
              {entry.excerpt}
            </p>
          </Link>
        ))}
      </section>
    </EntryWorkspace>
  );
}
