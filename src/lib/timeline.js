export const TIMELINE_STORAGE_KEY = "keenkeeper.timelineEntries";
export const TIMELINE_UPDATED_EVENT = "keenkeeper:timeline-updated";

export const readTimelineEntries = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedEntries = window.localStorage.getItem(TIMELINE_STORAGE_KEY);

    if (!storedEntries) {
      return [];
    }

    const parsedEntries = JSON.parse(storedEntries);
    return Array.isArray(parsedEntries) ? parsedEntries : [];
  } catch (error) {
    console.error("Failed to read timeline entries.", error);
    return [];
  }
};

export const writeTimelineEntries = (entries) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(entries));
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
