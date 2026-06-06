import type { Metadata } from "next";
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
import { sampleEntries } from "@/lib/sample-entries";

export const metadata: Metadata = {
  title: "모든 일기",
};

export default function EntriesPage() {
  const latestEntry = sampleEntries[0];

  return (
    <EntryWorkspace
      mobileHeader={
        <PageHeader
          actions={
            <Link href="/entries/new" className={primaryActionClassName}>
              새 일기
            </Link>
          }
          eyebrow={
            <Link href="/" className={textLinkClassName}>
              Diary Yaho
            </Link>
          }
          title="모든 일기"
        />
      }
      rail={
        <WorkspaceRailPanel
          actions={
            <>
              <Link href="/entries/new" className={primaryActionClassName}>
                새 일기
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
          meta={`${sampleEntries.length}개의 기록`}
          title="모든 일기"
        >
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm text-foreground/60">최근 기록</dt>
              <dd className="mt-1 text-base font-semibold">
                {latestEntry.dateLabel}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-foreground/60">기분</dt>
              <dd className="mt-1 text-base font-semibold">
                {latestEntry.mood}
              </dd>
            </div>
          </dl>
        </WorkspaceRailPanel>
      }
      size="wide"
    >
      <section aria-label="일기 목록" className="grid gap-3">
        {sampleEntries.map((entry) => (
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
              <span className={moodPillClassName}>{entry.mood}</span>
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
