import { type DiaryEntry, normalizeStoredEntries } from "@/lib/entries";

export const ENTRY_STORAGE_KEY = "diary-yaho:entries:v1";
export const ENTRY_STORAGE_EVENT = "diary-yaho:entries-changed";

export function readStoredEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(ENTRY_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    return normalizeStoredEntries(JSON.parse(rawValue));
  } catch {
    return [];
  }
}

export function writeStoredEntries(entries: DiaryEntry[]) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedEntries = normalizeStoredEntries(entries);
  window.localStorage.setItem(
    ENTRY_STORAGE_KEY,
    JSON.stringify(normalizedEntries),
  );
  window.dispatchEvent(new Event(ENTRY_STORAGE_EVENT));
}

export function saveStoredEntry(entry: DiaryEntry) {
  const previousEntries = readStoredEntries().filter(
    (storedEntry) => storedEntry.id !== entry.id,
  );
  writeStoredEntries([entry, ...previousEntries]);
}

export function subscribeStoredEntries(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === ENTRY_STORAGE_KEY) {
      onChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(ENTRY_STORAGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(ENTRY_STORAGE_EVENT, onChange);
  };
}
