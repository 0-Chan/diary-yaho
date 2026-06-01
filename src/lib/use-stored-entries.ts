"use client";

import { useEffect, useState } from "react";
import type { DiaryEntry } from "@/lib/entries";
import { readStoredEntries, subscribeStoredEntries } from "@/lib/entry-storage";

export function useStoredEntries() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const syncEntries = () => {
      setEntries(readStoredEntries());
      setIsLoaded(true);
    };

    syncEntries();

    return subscribeStoredEntries(syncEntries);
  }, []);

  return { entries, isLoaded };
}
