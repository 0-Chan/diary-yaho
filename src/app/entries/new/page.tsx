import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "새 일기",
};

export default function NewEntryPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="border-line border-b pb-5">
          <Link href="/" className="text-sm font-semibold text-accent-strong">
            Diary Yaho
          </Link>
          <h1 className="mt-2 text-3xl font-semibold">새 일기</h1>
        </header>

        <form className="grid gap-5 rounded-lg border border-line bg-surface p-5 shadow-sm">
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
            <Link
              href="/entries"
              className="rounded-lg border border-line px-5 py-3 text-sm font-semibold"
            >
              취소
            </Link>
            <button
              type="button"
              className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white"
            >
              초안 저장
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
