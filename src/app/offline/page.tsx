import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "오프라인",
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-8 text-foreground">
      <section className="w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-sm">
        <p className="text-sm font-semibold text-accent-strong">오프라인</p>
        <h1 className="mt-3 text-2xl font-semibold">연결을 확인해 주세요</h1>
        <p className="mt-4 leading-7 text-foreground/70">
          네트워크가 돌아오면 일기 목록과 작성 화면을 다시 불러올 수 있습니다.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white"
        >
          홈으로
        </Link>
      </section>
    </main>
  );
}
