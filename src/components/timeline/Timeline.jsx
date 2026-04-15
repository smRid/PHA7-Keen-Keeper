"use client";

import { useEffect, useState } from "react";
import { LuMessageSquareText, LuPhoneCall, LuVideo } from "react-icons/lu";
import { formatTimelineDate } from "@/lib/friend-ui";
import { readTimelineEntries, TIMELINE_UPDATED_EVENT } from "@/lib/timeline";

const typeIconMap = {
  Call: LuPhoneCall,
  Text: LuMessageSquareText,
  Video: LuVideo,
};

const TimelineClient = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const syncEntries = () => {
      setEntries(readTimelineEntries());
    };

    syncEntries();
    window.addEventListener("storage", syncEntries);
    window.addEventListener(TIMELINE_UPDATED_EVENT, syncEntries);

    return () => {
      window.removeEventListener("storage", syncEntries);
      window.removeEventListener(TIMELINE_UPDATED_EVENT, syncEntries);
    };
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-[#1F2937]">Timeline</h1>
        <p className="mt-2 text-[#73839D]">
          Quick check-ins from the friend details page appear here.
        </p>
      </div>

      {entries.length ? (
        <div className="space-y-3">
          {entries.map((entry) => {
            const Icon = typeIconMap[entry.type] ?? LuPhoneCall;

            return (
              <article
                key={entry.id}
                className="flex items-center justify-between gap-4 rounded-[12px] border border-[#E9EEF5] bg-white px-5 py-4 shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#285446]">
                    <Icon className="text-[22px]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1F2937]">{entry.title}</p>
                    <p className="text-sm text-[#73839D]">{entry.friendName}</p>
                  </div>
                </div>

                <p className="text-sm text-[#8A98AE]">
                  {formatTimelineDate(entry.createdAt)}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[12px] border border-dashed border-[#D6DFEA] bg-white px-6 py-16 text-center text-[#73839D]">
          No timeline entries yet.
        </div>
      )}
    </section>
  );
};

export default TimelineClient;
