export type MoodId = "good" | "excited" | "calm" | "sad" | "hard";

export type Visibility = "private" | "shared";

export type DiaryEntry = {
  id: string;
  title: string;
  dateLabel: string;
  mood: MoodId;
  excerpt: string;
  body: string;
  createdAt: string;
  visibility: Visibility;
};

export type NewDiaryEntryInput = {
  title: string;
  body: string;
  mood: MoodId;
  visibility: Visibility;
};

export const moodOptions: Array<{
  id: MoodId;
  label: string;
  face: string;
}> = [
  { id: "good", label: "좋음", face: ":)" },
  { id: "excited", label: "설렘", face: "^^" },
  { id: "calm", label: "평온", face: "--" },
  { id: "sad", label: "우울", face: ":(" },
  { id: "hard", label: "힘듦", face: ":|" },
];

export const visibilityOptions: Array<{
  id: Visibility;
  label: string;
}> = [
  { id: "private", label: "나만 보기" },
  { id: "shared", label: "함께 보기" },
];

export function getMoodLabel(mood: MoodId) {
  return moodOptions.find((option) => option.id === mood)?.label ?? mood;
}

export function getVisibilityLabel(visibility: Visibility) {
  return (
    visibilityOptions.find((option) => option.id === visibility)?.label ??
    visibility
  );
}

export function formatEntryDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function createExcerpt(body: string) {
  const normalizedBody = body.trim().replace(/\s+/g, " ");

  if (normalizedBody.length <= 84) {
    return normalizedBody;
  }

  return `${normalizedBody.slice(0, 84)}...`;
}

export function createDiaryEntry(input: NewDiaryEntryInput): DiaryEntry {
  const createdAt = new Date();
  const id = [
    "local",
    createdAt.getTime().toString(36),
    Math.random().toString(36).slice(2, 8),
  ].join("-");

  return {
    id,
    title: input.title.trim(),
    body: input.body.trim(),
    excerpt: createExcerpt(input.body),
    dateLabel: formatEntryDate(createdAt),
    createdAt: createdAt.toISOString(),
    mood: input.mood,
    visibility: input.visibility,
  };
}

export function normalizeStoredEntries(value: unknown): DiaryEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map(normalizeStoredEntry)
    .filter((entry): entry is DiaryEntry => Boolean(entry))
    .sort(
      (left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt),
    );
}

function normalizeStoredEntry(value: unknown): DiaryEntry | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const entry = value as Record<string, unknown>;

  if (
    typeof entry.id !== "string" ||
    typeof entry.title !== "string" ||
    typeof entry.body !== "string" ||
    typeof entry.createdAt !== "string" ||
    !isMoodId(entry.mood) ||
    !isVisibility(entry.visibility)
  ) {
    return null;
  }

  return {
    id: entry.id,
    title: entry.title,
    body: entry.body,
    createdAt: entry.createdAt,
    dateLabel:
      typeof entry.dateLabel === "string"
        ? entry.dateLabel
        : formatEntryDate(new Date(entry.createdAt)),
    excerpt:
      typeof entry.excerpt === "string"
        ? entry.excerpt
        : createExcerpt(entry.body),
    mood: entry.mood,
    visibility: entry.visibility,
  };
}

function isMoodId(value: unknown): value is MoodId {
  return (
    typeof value === "string" &&
    moodOptions.some((option) => option.id === value)
  );
}

function isVisibility(value: unknown): value is Visibility {
  return value === "private" || value === "shared";
}
