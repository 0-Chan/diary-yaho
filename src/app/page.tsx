import Link from "next/link";
import { sampleEntries } from "@/lib/sample-entries";

const today = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(new Date());

export default function Home() {
  const latestEntry = sampleEntries[0];

  return (
    <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-line border-b pb-5">
          <div>
            <p className="text-accent-strong text-sm font-semibold">{today}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal">
              Diary Yaho
            </h1>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/entries"
              className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold"
            >
              모든 일기
            </Link>
            <Link
              href="/entries/new"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
            >
              새 일기
            </Link>
          </nav>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-lg border border-line bg-surface p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-accent-strong">
                  오늘의 기록
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  지금 남기고 싶은 장면
                </h2>
              </div>
              <span className="rounded-full bg-surface-muted px-3 py-1 text-sm font-semibold">
                초안
              </span>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/75">
              짧은 문장 하나라도 남겨두면 오늘의 온도가 이어집니다. 기분, 장소,
              함께한 사람을 기준으로 오늘의 첫 기록을 시작합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/entries/new"
                className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white"
              >
                기록 시작
              </Link>
              <Link
                href={`/entries/${latestEntry.id}`}
                className="rounded-lg border border-line px-5 py-3 text-sm font-semibold"
              >
                최근 일기 보기
              </Link>
            </div>
          </article>

          <aside className="rounded-lg border border-line bg-surface p-5 shadow-sm">
            <p className="text-sm font-semibold text-accent-strong">
              최근 흐름
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-3">
              <div>
                <dt className="text-sm text-foreground/60">이번 주</dt>
                <dd className="mt-1 text-2xl font-semibold">3</dd>
              </div>
              <div>
                <dt className="text-sm text-foreground/60">기분</dt>
                <dd className="mt-1 text-2xl font-semibold">맑음</dd>
              </div>
              <div>
                <dt className="text-sm text-foreground/60">연속</dt>
                <dd className="mt-1 text-2xl font-semibold">2일</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="grid gap-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">최근 일기</h2>
            <Link
              href="/entries"
              className="text-sm font-semibold text-accent-strong"
            >
              전체 보기
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {sampleEntries.map((entry) => (
              <Link
                key={entry.id}
                href={`/entries/${entry.id}`}
                className="rounded-lg border border-line bg-surface p-4 shadow-sm transition hover:border-accent"
              >
                <p className="text-sm text-foreground/60">{entry.dateLabel}</p>
                <h3 className="mt-3 text-lg font-semibold">{entry.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/70">
                  {entry.excerpt}
                </p>
                <span className="mt-4 inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold">
                  {entry.mood}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
