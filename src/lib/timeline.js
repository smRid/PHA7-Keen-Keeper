export const TIMELINE_STORAGE_KEY = "keenkeeper.timelineEntries";
export const TIMELINE_UPDATED_EVENT = "keenkeeper:timeline-updated";

export const DEFAULT_TIMELINE_ENTRIES = [
  {
    id: "default-meetup-tom-baker-2026-03-29",
    type: "Meetup",
    friendName: "Tom Baker",
    title: "Meetup with Tom Baker",
    createdAt: "2026-03-29T12:00:00.000Z",
  },
  {
    id: "default-text-sarah-chen-2026-03-28",
    type: "Text",
    friendName: "Sarah Chen",
    title: "Text with Sarah Chen",
    createdAt: "2026-03-28T12:00:00.000Z",
  },
  {
    id: "default-meetup-olivia-martinez-2026-03-26",
    type: "Meetup",
    friendName: "Olivia Martinez",
    title: "Meetup with Olivia Martinez",
    createdAt: "2026-03-26T12:00:00.000Z",
  },
  {
    id: "default-video-aisha-patel-2026-03-23",
    type: "Video",
    friendName: "Aisha Patel",
    title: "Video with Aisha Patel",
    createdAt: "2026-03-23T12:00:00.000Z",
  },
  {
    id: "default-meetup-sarah-chen-2026-03-21",
    type: "Meetup",
    friendName: "Sarah Chen",
    title: "Meetup with Sarah Chen",
    createdAt: "2026-03-21T12:00:00.000Z",
  },
  {
    id: "default-call-marcus-johnson-2026-03-19",
    type: "Call",
    friendName: "Marcus Johnson",
    title: "Call with Marcus Johnson",
    createdAt: "2026-03-19T12:00:00.000Z",
  },
  {
    id: "default-meetup-aisha-patel-2026-03-17",
    type: "Meetup",
    friendName: "Aisha Patel",
    title: "Meetup with Aisha Patel",
    createdAt: "2026-03-17T12:00:00.000Z",
  },
  {
    id: "default-text-olivia-martinez-2026-03-13",
    type: "Text",
    friendName: "Olivia Martinez",
    title: "Text with Olivia Martinez",
    createdAt: "2026-03-13T12:00:00.000Z",
  },
  {
    id: "default-call-lisa-nakamura-2026-03-11",
    type: "Call",
    friendName: "Lisa Nakamura",
    title: "Call with Lisa Nakamura",
    createdAt: "2026-03-11T18:00:00.000Z",
  },
  {
    id: "default-call-sarah-chen-2026-03-11",
    type: "Call",
    friendName: "Sarah Chen",
    title: "Call with Sarah Chen",
    createdAt: "2026-03-11T12:00:00.000Z",
  },
  {
    id: "default-video-marcus-johnson-2026-03-06",
    type: "Video",
    friendName: "Marcus Johnson",
    title: "Video with Marcus Johnson",
    createdAt: "2026-03-06T12:00:00.000Z",
  },
  {
    id: "default-video-ryan-obrien-2026-02-24",
    type: "Video",
    friendName: "Ryan O'Brien",
    title: "Video with Ryan O'Brien",
    createdAt: "2026-02-24T12:00:00.000Z",
  },
];

const getTimelineTimestamp = (entry) => {
  const timestamp = new Date(entry?.createdAt ?? 0).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const mergeTimelineEntries = (entries = []) => {
  const mergedEntries = new Map();

  [...DEFAULT_TIMELINE_ENTRIES, ...entries].forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      return;
    }

    const id =
      entry.id ??
      `${entry.type ?? "timeline"}-${entry.friendId ?? entry.friendName ?? "entry"}-${entry.createdAt ?? Date.now()}`;

    mergedEntries.set(id, {
      ...entry,
      id,
    });
  });

  return Array.from(mergedEntries.values()).sort(
    (leftEntry, rightEntry) =>
      getTimelineTimestamp(rightEntry) - getTimelineTimestamp(leftEntry),
  );
};

export const readTimelineEntries = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedEntries = window.localStorage.getItem(TIMELINE_STORAGE_KEY);

    if (!storedEntries) {
      return DEFAULT_TIMELINE_ENTRIES;
    }

    const parsedEntries = JSON.parse(storedEntries);
    return mergeTimelineEntries(Array.isArray(parsedEntries) ? parsedEntries : []);
  } catch (error) {
    console.error("Failed to read timeline entries.", error);
    return DEFAULT_TIMELINE_ENTRIES;
  }
};

export const writeTimelineEntries = (entries) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    TIMELINE_STORAGE_KEY,
    JSON.stringify(mergeTimelineEntries(entries)),
  );
  window.dispatchEvent(new Event(TIMELINE_UPDATED_EVENT));
};

export const createQuickCheckInEntry = ({ type, friendId, friendName }) => ({
  id:
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${type}-${friendId}`,
  type,
  friendId,
  friendName,
  title: `${type} with ${friendName}`,
  createdAt: new Date().toISOString(),
});

export const addTimelineEntry = (entry) => {
  const existingEntries = readTimelineEntries();
  const nextEntries = [entry, ...existingEntries];
  writeTimelineEntries(nextEntries);
  return nextEntries;
};
