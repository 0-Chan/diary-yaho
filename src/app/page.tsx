import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

const unreadLetters = 1;

const tabItems = [
  { label: "오늘", href: "/", icon: HomeIcon, active: true },
  { label: "우편함", href: "/entries", icon: MailIcon, active: false },
  { label: "캘린더", icon: CalendarIcon, active: false },
  { label: "친구", icon: FriendsIcon, active: false },
];

function formatToday() {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date());
}

export default async function Home() {
  await connection();
  const today = formatToday();

  return (
    <main className="min-h-svh bg-background px-4 pb-4 pt-6 text-foreground sm:px-6">
      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] w-full max-w-[430px] flex-col gap-5">
        <header className="flex items-start justify-between gap-4 px-1 pt-2">
          <div>
            <h1 className="text-[2.05rem] font-extrabold leading-tight tracking-normal min-[390px]:text-[2.45rem]">
              오늘의 우편함
            </h1>
            <p className="mt-2 text-[1.35rem] font-semibold leading-tight">
              {today}
            </p>
          </div>

          <Link
            href="/entries"
            aria-label={`새 알림 ${unreadLetters}개, 우편함 보기`}
            className="relative mt-2 flex size-12 shrink-0 items-center justify-center rounded-lg border border-transparent text-foreground transition hover:border-line hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/35"
          >
            <BellIcon className="size-9" />
            <span className="-right-1 -top-1 absolute flex size-6 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-sm">
              {unreadLetters}
            </span>
          </Link>
        </header>

        <Link
          href="/entries"
          className="rounded-lg border border-line bg-surface px-5 py-4 shadow-sm transition hover:border-accent/55 focus:outline-none focus:ring-2 focus:ring-accent/35"
        >
          <div className="flex items-center gap-4">
            <div className="relative flex size-[4.5rem] shrink-0 items-center justify-center rounded-lg border border-line bg-white text-accent">
              <EnvelopeIcon className="size-12" />
              <span className="-right-2 -top-2 absolute flex size-8 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-sm">
                {unreadLetters}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[1.22rem] font-bold leading-snug">
                새 편지{" "}
                <span className="text-accent-strong">{unreadLetters}</span>통이
                도착했어요
              </p>
              <p className="mt-2 text-lg font-medium text-foreground/70">
                조심스럽게 뜯어볼까요?
              </p>
            </div>
            <ChevronRightIcon className="size-8 shrink-0 text-foreground/55" />
          </div>
        </Link>

        <section
          aria-label="오늘 우편함 상태"
          className="flex min-h-[190px] flex-1 items-center justify-between gap-5 rounded-lg border border-line bg-surface px-6 py-5 shadow-sm"
        >
          <div className="min-w-0">
            <p className="text-sm font-bold text-accent-strong">오늘의 상태</p>
            <p className="mt-3 text-2xl font-extrabold leading-tight">
              편지를 쓸 준비가 됐어요
            </p>
            <p className="mt-3 max-w-52 text-base font-medium leading-6 text-foreground/65">
              새 편지를 확인하거나 바로 오늘의 마음을 남겨보세요.
            </p>
          </div>

          <Image
            src="/assets/cat-walk-white@3x.png"
            alt="걷는 고양이"
            width={192}
            height={146}
            priority
            className="h-auto w-32 shrink-0 mix-blend-multiply"
          />
        </section>

        <div className="grid gap-3">
          <Link
            href="/entries/new"
            className="flex min-h-24 items-center gap-5 rounded-lg border border-[#bb4938] bg-accent px-6 py-4 text-white shadow-sm transition hover:bg-accent-strong focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <span className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-white/45 bg-[#fff7e9] text-accent shadow-sm">
              <EnvelopeIcon className="size-11" />
            </span>
            <span className="min-w-0 flex-1 text-[1.75rem] font-extrabold leading-tight min-[390px]:text-[2rem]">
              편지 쓰기
            </span>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/18 shadow-inner">
              <ChevronRightIcon className="size-9" />
            </span>
          </Link>

          <Link
            href="/entries/new?stamp=basic"
            className="flex min-h-24 items-center gap-5 rounded-lg border border-line bg-surface px-6 py-4 text-foreground shadow-sm transition hover:border-[#b6b58c] focus:outline-none focus:ring-2 focus:ring-[#a8b18c]/45"
          >
            <span className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-[#e1d6b8] bg-white text-[#7b8b62] shadow-sm">
              <StampIcon className="size-12" />
            </span>
            <span className="min-w-0 flex-1 text-[1.45rem] font-extrabold leading-tight min-[390px]:text-[1.7rem]">
              기본 우표 붙이기
            </span>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#9fac83] text-white shadow-sm">
              <ChevronRightIcon className="size-9" />
            </span>
          </Link>
        </div>

        <nav
          aria-label="주요 메뉴"
          className="mt-auto grid grid-cols-4 gap-1 rounded-lg border border-line bg-surface px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-8px_22px_rgba(65,45,24,0.08)]"
        >
          {tabItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon className="size-8" />
                <span className="mt-1 text-sm font-bold">{item.label}</span>
                {item.active ? (
                  <span className="mt-2 h-1 w-8 rounded-full bg-accent" />
                ) : (
                  <span className="mt-2 h-1 w-8 rounded-full bg-transparent" />
                )}
              </>
            );

            if ("href" in item && item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex min-h-16 flex-col items-center justify-center rounded-lg transition focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                    item.active
                      ? "text-accent"
                      : "text-foreground/55 hover:bg-surface-muted"
                  }`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <span
                key={item.label}
                aria-disabled="true"
                className="flex min-h-16 flex-col items-center justify-center rounded-lg text-foreground/45"
              >
                {content}
              </span>
            );
          })}
        </nav>
      </div>
    </main>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M6.3 10.5a5.7 5.7 0 0 1 11.4 0v3.3l1.7 2.9H4.6l1.7-2.9v-3.3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9.8 19a2.4 2.4 0 0 0 4.4 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 4.5v3M18 4.5v3M4.5 9.5h15M6.5 6h11A2.5 2.5 0 0 1 20 8.5v9A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-9A2.5 2.5 0 0 1 6.5 6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M8 13h.01M12 13h.01M16 13h.01M8 16h.01M12 16h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 17 19H7a2.5 2.5 0 0 1-2.5-2.5v-9Z"
        fill="currentColor"
        opacity=".14"
      />
      <path
        d="M5 7.5 12 13l7-5.5M7 5h10a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 17 19H7a2.5 2.5 0 0 1-2.5-2.5v-9A2.5 2.5 0 0 1 7 5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function FriendsIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M8.5 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15.5 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M2.8 20a5.7 5.7 0 0 1 11.4 0M9.8 20a5.7 5.7 0 0 1 11.4 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m4 11 8-6.5 8 6.5v7.2a1.8 1.8 0 0 1-1.8 1.8h-3.7v-5.2h-5V20H5.8A1.8 1.8 0 0 1 4 18.2V11Z"
        fill="currentColor"
        opacity=".16"
      />
      <path
        d="m4 11 8-6.5 8 6.5v7.2a1.8 1.8 0 0 1-1.8 1.8h-3.7v-5.2h-5V20H5.8A1.8 1.8 0 0 1 4 18.2V11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return <EnvelopeIcon className={className} />;
}

function StampIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M6 4.5h12v2l1.5 1.5L18 9.5v2l1.5 1.5L18 14.5v2l1.5 1.5-1.5 1.5H6L4.5 18 6 16.5v-2L4.5 13 6 11.5v-2L4.5 8 6 6.5v-2Z"
        fill="currentColor"
        opacity=".12"
      />
      <path
        d="M6 4.5h12v2l1.5 1.5L18 9.5v2l1.5 1.5L18 14.5v2l1.5 1.5-1.5 1.5H6L4.5 18 6 16.5v-2L4.5 13 6 11.5v-2L4.5 8 6 6.5v-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M9 12.2c.6 1 1.6 1.7 3 1.7s2.4-.7 3-1.7M9.4 9.6h.01M14.6 9.6h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}
