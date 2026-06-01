import type { DiaryEntry } from "@/lib/entries";

export const sampleEntries: DiaryEntry[] = [
  {
    id: "first-evening-walk",
    title: "퇴근길의 바람",
    dateLabel: "6월 2일 화요일",
    mood: "calm",
    excerpt:
      "늦은 저녁의 바람이 생각보다 시원했다. 오늘은 서두르지 않고 집까지 걸었다.",
    body: "늦은 저녁의 바람이 생각보다 시원했다. 오늘은 서두르지 않고 집까지 걸었다. 길가의 불빛이 하나씩 켜지는 것을 보면서 마음도 조금씩 정리됐다.",
    createdAt: "2026-06-02T11:00:00.000Z",
    visibility: "private",
  },
  {
    id: "small-win",
    title: "작은 완료",
    dateLabel: "6월 1일 월요일",
    mood: "good",
    excerpt:
      "미뤄둔 일을 하나 끝냈다. 대단한 일은 아니지만 하루의 방향이 달라졌다.",
    body: "미뤄둔 일을 하나 끝냈다. 대단한 일은 아니지만 하루의 방향이 달라졌다. 끝낸 일보다 시작하기 전의 부담이 더 컸다는 것도 기억해 둔다.",
    createdAt: "2026-06-01T10:30:00.000Z",
    visibility: "private",
  },
  {
    id: "quiet-morning",
    title: "조용한 아침",
    dateLabel: "5월 31일 일요일",
    mood: "good",
    excerpt:
      "창문을 열고 커피를 마셨다. 아무것도 정하지 않은 시간이 꽤 오래 남았다.",
    body: "창문을 열고 커피를 마셨다. 아무것도 정하지 않은 시간이 꽤 오래 남았다. 오늘은 할 일을 줄이고 천천히 쉬는 쪽으로 마음을 두었다.",
    createdAt: "2026-05-31T01:10:00.000Z",
    visibility: "private",
  },
];

export function findSampleEntry(entryId: string) {
  return sampleEntries.find((entry) => entry.id === entryId);
}
