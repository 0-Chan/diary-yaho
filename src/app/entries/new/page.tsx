import type { Metadata } from "next";
import { NewEntryForm } from "@/components/new-entry-form";

export const metadata: Metadata = {
  title: "새 편지",
};

export default function NewEntryPage() {
  return <NewEntryForm />;
}
