import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EntryWorkspace,
  moodPillClassName,
  PageHeader,
  SurfaceCard,
  secondaryActionClassName,
  textLinkClassName,
  WorkspaceRailPanel,
} from "@/components/entry-workspace";
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
    <EntryWorkspace
      mobileHeader={
        <PageHeader
          badge={<span className={moodPillClassName}>{entry.mood}</span>}
          eyebrow={
            <Link href="/entries" className={textLinkClassName}>
              모든 일기
            </Link>
          }
          meta={entry.dateLabel}
          title={entry.title}
        />
      }
      rail={
        <WorkspaceRailPanel
          actions={
            <Link href="/entries" className={secondaryActionClassName}>
              목록으로
            </Link>
          }
          badge={<span className={moodPillClassName}>{entry.mood}</span>}
          eyebrow={
            <Link href="/entries" className={textLinkClassName}>
              모든 일기
            </Link>
          }
          meta={entry.dateLabel}
          title={entry.title}
        />
      }
    >
      <article>
        <SurfaceCard>
          <p className="whitespace-pre-line text-base leading-8 text-foreground/80">
            {entry.body}
          </p>
        </SurfaceCard>
      </article>
    </EntryWorkspace>
  );
}
