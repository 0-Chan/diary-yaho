"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import {
  createDiaryEntry,
  type MoodId,
  moodOptions,
  type Visibility,
  visibilityOptions,
} from "@/lib/entries";
import { saveStoredEntry } from "@/lib/entry-storage";

const moodToneClassNames: Record<MoodId, string> = {
  good: "bg-[#c8ebe4] text-[#1f6f5f]",
  excited: "bg-[#ffd7cf] text-[#b04437]",
  calm: "bg-[#dfead3] text-[#536d42]",
  sad: "bg-[#d6e4f8] text-[#3d6299]",
  hard: "bg-[#e5dbf3] text-[#634c8d]",
};

export function NewEntryForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState<MoodId>("good");
  const [visibility, setVisibility] = useState<Visibility>("private");

  const canSubmit = useMemo(
    () => title.trim().length > 0 && body.trim().length > 0,
    [body, title],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const entry = createDiaryEntry({
      title,
      body,
      mood,
      visibility,
    });

    saveStoredEntry(entry);
    router.push(`/entries/${entry.id}`);
  };

  return (
    <main className="min-h-screen bg-[#fbf4e8] px-4 py-5 text-[#34251f] sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-[430px] flex-col gap-6"
      >
        <header className="grid grid-cols-[44px_1fr_44px] items-center">
          <Link
            href="/"
            aria-label="닫기"
            className="flex size-11 items-center justify-center text-4xl leading-none text-[#34251f]"
          >
            ×
          </Link>
          <h1 className="text-center text-2xl font-bold tracking-normal">
            편지 쓰기
          </h1>
          <button
            type="button"
            aria-label="도움말"
            className="flex size-10 items-center justify-center justify-self-end rounded-full border-2 border-[#34251f] text-xl font-bold"
          >
            ?
          </button>
        </header>

        <section className="letter-card paper-surface rounded-lg border border-[#d4c5ad] px-5 pt-12 pb-5 shadow-[0_12px_28px_rgba(73,50,35,0.12)]">
          <label htmlFor="entry-title" className="sr-only">
            제목
          </label>
          <input
            id="entry-title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목을 입력하세요"
            className="min-h-14 w-full rounded-lg border border-[#d8cbb8] bg-white/45 px-4 text-lg text-[#34251f] outline-none transition placeholder:text-[#9d9287] focus:border-[#2c6c48] focus:bg-white/70"
          />

          <div className="mt-5 rounded-lg border border-[#d8cbb8] bg-white/35 p-4">
            <label htmlFor="entry-body" className="sr-only">
              내용
            </label>
            <textarea
              id="entry-body"
              name="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="오늘의 이야기를 들려주세요..."
              className="lined-paper min-h-[300px] w-full resize-none bg-transparent text-lg leading-[43px] text-[#34251f] outline-none placeholder:text-[#9d9287]"
            />
          </div>
        </section>

        <section className="grid gap-3">
          <h2 className="text-lg font-bold">기분 우표</h2>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((option) => {
              const isSelected = mood === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setMood(option.id)}
                  className={`stamp-tile flex min-w-0 flex-col items-center gap-2 rounded-md border bg-[#fffaf0] px-1 py-2 text-center transition ${
                    isSelected
                      ? "border-[#286447] shadow-[0_0_0_2px_rgba(40,100,71,0.22)]"
                      : "border-[#d9cbb8]"
                  }`}
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-full text-sm font-bold ${moodToneClassNames[option.id]}`}
                  >
                    {option.face}
                  </span>
                  <span className="text-sm font-bold">{option.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold">사진 추가</h2>
            <span className="text-lg font-bold text-[#8d8278]">0/3</span>
          </div>
          <button
            type="button"
            aria-disabled="true"
            aria-label="사진 추가"
            className="flex size-16 items-center justify-center rounded-lg border-2 border-dashed border-[#d5c7b6] bg-[#fffaf0]/60 text-[#6a5b4d]"
          >
            <CameraIcon />
          </button>
        </section>

        <section className="grid gap-3">
          <h2 className="text-lg font-bold">공개 설정</h2>
          <fieldset className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-[#d9cbb8] bg-[#fffaf0]">
            <legend className="sr-only">공개 설정</legend>
            {visibilityOptions.map((option) => {
              const isSelected = visibility === option.id;

              return (
                <label
                  key={option.id}
                  className={`flex min-h-16 cursor-pointer items-center justify-center gap-2 text-base font-bold transition ${
                    isSelected
                      ? "rounded-[20px] border-2 border-[#286447] bg-white/45 text-[#286447]"
                      : "text-[#4b3b32]"
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setVisibility(option.id)}
                    className="sr-only"
                  />
                  {option.id === "private" ? <LockIcon /> : <GroupIcon />}
                  {option.label}
                </label>
              );
            })}
          </fieldset>
        </section>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-1 min-h-16 rounded-2xl border border-[#b94533] bg-[#dd5d48] px-6 text-2xl font-bold text-white shadow-[0_6px_0_#a83d2e] transition enabled:active:translate-y-1 enabled:active:shadow-[0_2px_0_#a83d2e] disabled:cursor-not-allowed disabled:opacity-45"
        >
          봉인하기
        </button>
      </form>
    </main>
  );
}

function CameraIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M5 8h3l1.5-2h5L16 8h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13.5" r="3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M16 19v-1a4 4 0 0 0-8 0v1" />
      <circle cx="12" cy="9" r="3" />
      <path d="M20 19v-1a3 3 0 0 0-3-3" />
      <path d="M4 19v-1a3 3 0 0 1 3-3" />
    </svg>
  );
}
