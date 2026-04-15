"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import callIcon from "@/assets/call.png";
import meetupIcon from "@/assets/meetup.png";
import textIcon from "@/assets/text.png";
import videoIcon from "@/assets/video.png";
import { formatTimelineDate } from "@/lib/friend-ui";
import { readTimelineEntries, TIMELINE_UPDATED_EVENT } from "@/lib/timeline";

const filterOptions = [
  { value: "", label: "Filter timeline" },
  { value: "Call", label: "Calls" },
  { value: "Text", label: "Texts" },
  { value: "Video", label: "Videos" },
  { value: "Meetup", label: "Meetups" },
];

const sortOptions = [
  { value: "", label: "Filter date" },
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Newest first" },
];

const typeIconMap = {
  Call: {
    icon: callIcon,
    alt: "Call",
  },
  Text: {
    icon: textIcon,
    alt: "Text",
  },
  Video: {
    icon: videoIcon,
    alt: "Video",
  },
  Meetup: {
    icon: meetupIcon,
    alt: "Meetup",
  },
};

const getEntryTimestamp = (entry) => {
  const timestamp = new Date(entry?.createdAt ?? 0).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const TimelineClient = () => {
  const [entries, setEntries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredEntries = entries
    .filter((entry) =>
      selectedFilter ? entry.type === selectedFilter : true,
    )
    .filter((entry) => {
      if (!normalizedQuery) {
        return true;
      }

      const searchableText = `${entry.type ?? ""} ${entry.friendName ?? ""} ${entry.title ?? ""}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    })
    .sort((leftEntry, rightEntry) => {
      const newestFirstOrder =
        getEntryTimestamp(rightEntry) - getEntryTimestamp(leftEntry);

      return selectedSort === "oldest" ? -newestFirstOrder : newestFirstOrder;
    });

  return (
    <section className="mx-auto flex w-full max-w-[1110px] flex-1 flex-col px-5 py-10 sm:px-6 md:py-12">
      <div className="space-y-5">
        <h1 className="text-[44px] font-bold leading-none tracking-[-0.04em] text-[#1E293B] sm:text-[52px]">
          Timeline
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative w-full max-w-[220px]">
            <select
              value={selectedFilter}
              onChange={(event) => setSelectedFilter(event.target.value)}
              className="h-[48px] w-full appearance-none rounded-[8px] border border-[#D9E1EC] bg-white px-4 pr-10 text-[15px] text-[#73839D] outline-none transition focus:border-[#244D3F]"
            >
              {filterOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <LuChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[#9BA9BD]" />
          </div>

          <div className="relative w-full max-w-[220px]">
            <select
              value={selectedSort}
              onChange={(event) => setSelectedSort(event.target.value)}
              className="h-[48px] w-full appearance-none rounded-[8px] border border-[#D9E1EC] bg-white px-4 pr-10 text-[15px] text-[#73839D] outline-none transition focus:border-[#244D3F]"
            >
              {sortOptions.map((option, index) => (
                <option key={`${option.label}-${index}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <LuChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[#9BA9BD]" />
          </div>

          <div className="w-full max-w-[260px]">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search timeline"
              className="h-[48px] w-full rounded-[8px] border border-[#D9E1EC] bg-white px-4 text-[15px] text-[#73839D] outline-none transition placeholder:text-[#9BA9BD] focus:border-[#244D3F]"
            />
          </div>
        </div>
      </div>

      {filteredEntries.length ? (
        <div className="mt-6 space-y-3">
          {filteredEntries.map((entry) => {
            const entryVisual = typeIconMap[entry.type] ?? typeIconMap.Call;

            return (
              <article
                key={entry.id}
                className="flex min-h-[68px] items-start gap-4 rounded-[8px] border border-[#DCE4EF] bg-white px-4 py-4"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                  <Image
                    src={entryVisual.icon}
                    alt={`${entryVisual.alt} icon`}
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain"
                  />
                </div>

                <div className="min-w-0">
                  {entry.friendName ? (
                    <p className="text-[15px] leading-[1.35]">
                      <span className="font-semibold text-[#285446]">
                        {entry.type}
                      </span>
                      <span className="text-[#73839D]">
                        {" "}
                        with {entry.friendName}
                      </span>
                    </p>
                  ) : (
                    <p className="text-[15px] font-semibold leading-[1.35] text-[#285446]">
                      {entry.title ?? entry.type}
                    </p>
                  )}

                  <p className="mt-1 text-[14px] leading-[1.25] text-[#73839D]">
                    {formatTimelineDate(entry.createdAt)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-[8px] border border-dashed border-[#D6DFEA] bg-white px-6 py-14 text-center text-[15px] text-[#73839D]">
          No timeline entries match this filter.
        </div>
      )}
    </section>
  );
};

export default TimelineClient;
