import type { Metadata } from "next";
import Link from "next/link";
import {
  EntryWorkspace,
  largePrimaryActionClassName,
  largeSecondaryActionClassName,
  PageHeader,
  secondaryActionClassName,
  surfaceCardClassName,
  textLinkClassName,
  WorkspaceRailPanel,
} from "@/components/entry-workspace";

export const metadata: Metadata = {
  title: "새 일기",
};

export default function NewEntryPage() {
  return (
    <EntryWorkspace
      mobileHeader={
        <PageHeader
          eyebrow={
            <Link href="/" className={textLinkClassName}>
              Diary Yaho
            </Link>
          }
          title="새 일기"
        />
      }
      rail={
        <WorkspaceRailPanel
          actions={
            <Link href="/entries" className={secondaryActionClassName}>
              모든 일기
            </Link>
          }
          eyebrow={
            <Link href="/" className={textLinkClassName}>
              Diary Yaho
            </Link>
          }
          meta="초안"
          title="새 일기"
        />
      }
    >
      <form className={`grid gap-5 ${surfaceCardClassName}`}>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">제목</span>
          <input
            name="title"
            placeholder="오늘을 한 문장으로"
            className="min-h-12 rounded-lg border border-line bg-white px-4 text-base outline-none transition focus:border-accent"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">기분</span>
          <select
            name="mood"
            className="min-h-12 rounded-lg border border-line bg-white px-4 text-base outline-none transition focus:border-accent"
            defaultValue="calm"
          >
            <option value="calm">차분함</option>
            <option value="clear">맑음</option>
            <option value="light">가벼움</option>
            <option value="heavy">무거움</option>
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold">내용</span>
          <textarea
            name="body"
            placeholder="오늘의 장면, 감정, 기억할 일을 적어두세요."
            className="min-h-64 resize-y rounded-lg border border-line bg-white px-4 py-3 text-base leading-7 outline-none transition focus:border-accent"
          />
        </label>

        <div className="flex flex-wrap justify-end gap-3">
          <Link href="/entries" className={largeSecondaryActionClassName}>
            취소
          </Link>
          <button type="button" className={largePrimaryActionClassName}>
            초안 저장
          </button>
        </div>
      </form>
    </EntryWorkspace>
  );
}
