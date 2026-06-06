"use client";

import Link from "next/link";
import {
  EntryWorkspace,
  moodPillClassName,
  PageHeader,
  primaryActionClassName,
  SurfaceCard,
  secondaryActionClassName,
  textLinkClassName,
  WorkspaceRailPanel,
} from "@/components/entry-workspace";
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
      <EntryWorkspace
        mobileHeader={
          <PageHeader
            eyebrow={
              <Link href="/entries" className={textLinkClassName}>
                우편함
              </Link>
            }
            title="편지"
          />
        }
        rail={
          <WorkspaceRailPanel
            eyebrow={
              <Link href="/entries" className={textLinkClassName}>
                우편함
              </Link>
            }
            meta="불러오는 중"
            title="편지"
          />
        }
      >
        <SurfaceCard>편지를 불러오는 중입니다.</SurfaceCard>
      </EntryWorkspace>
    );
  }

  if (!entry) {
    return (
      <EntryWorkspace
        mobileHeader={
          <PageHeader
            eyebrow={
              <Link href="/entries" className={textLinkClassName}>
                우편함
              </Link>
            }
            title="편지를 찾을 수 없습니다"
          />
        }
        rail={
          <WorkspaceRailPanel
            actions={
              <Link href="/entries/new" className={primaryActionClassName}>
                편지 쓰기
              </Link>
            }
            eyebrow={
              <Link href="/entries" className={textLinkClassName}>
                우편함
              </Link>
            }
            title="편지를 찾을 수 없습니다"
          />
        }
      >
        <SurfaceCard>
          <p className="text-base leading-7 text-foreground/75">
            저장된 브라우저가 다르거나 삭제된 편지입니다.
          </p>
          <Link
            href="/entries/new"
            className="mt-5 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white"
          >
            편지 쓰기
          </Link>
        </SurfaceCard>
      </EntryWorkspace>
    );
  }

  const badges = (
    <div className="flex flex-wrap gap-2">
      <span className={moodPillClassName}>{getMoodLabel(entry.mood)}</span>
      <span className={moodPillClassName}>
        {getVisibilityLabel(entry.visibility)}
      </span>
    </div>
  );

  return (
    <EntryWorkspace
      mobileHeader={
        <PageHeader
          badge={badges}
          eyebrow={
            <Link href="/entries" className={textLinkClassName}>
              우편함
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
          badge={badges}
          eyebrow={
            <Link href="/entries" className={textLinkClassName}>
              우편함
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
