"use client";

import Image from "next/image";
import {
  LuArchive,
  LuBellRing,
  LuHistory,
  LuMessageSquareText,
  LuPencil,
  LuPhoneCall,
  LuTrash2,
  LuVideo,
} from "react-icons/lu";
import { toast } from "react-toastify";
import { formatCalendarDate, getFriendStatusMeta } from "@/lib/friend-ui";
import { addTimelineEntry, createQuickCheckInEntry } from "@/lib/timeline";

const actionButtons = [
  {
    label: "Snooze 2 Weeks",
    icon: LuBellRing,
    className: "text-[#1F2937]",
  },
  {
    label: "Archive",
    icon: LuArchive,
    className: "text-[#1F2937]",
  },
  {
    label: "Delete",
    icon: LuTrash2,
    className: "text-[#FF4D4F]",
  },
];

const quickCheckInActions = [
  { type: "Call", icon: LuPhoneCall },
  { type: "Text", icon: LuMessageSquareText },
  { type: "Video", icon: LuVideo },
];

const staticInteractions = [
  {
    title: "Text",
    detail: "Asked for career advice",
    date: "Jan 28, 2026",
    icon: LuMessageSquareText,
  },
  {
    title: "Meetup",
    detail: "Industry conference meetup",
    date: "Jan 28, 2026",
    icon: LuPhoneCall,
  },
  {
    title: "Video",
    detail: "Asked for career advice",
    date: "Jan 28, 2026",
    icon: LuVideo,
  },
  {
    title: "Text",
    detail: "Asked for career advice",
    date: "Jan 28, 2026",
    icon: LuPhoneCall,
  },
];

const FriendDetails = ({ friend }) => {
  const statusMeta = getFriendStatusMeta(friend.status);

  const stats = [
    {
      label: "Days Since Contact",
      value: friend.days_since_contact,
    },
    {
      label: "Goal (Days)",
      value: friend.goal,
    },
    {
      label: "Next Due",
      value: formatCalendarDate(friend.next_due_date),
    },
  ];

  const handleQuickCheckIn = (type) => {
    addTimelineEntry(
      createQuickCheckInEntry({
        type,
        friendId: friend.id,
        friendName: friend.name,
      }),
    );

    toast.success(`${type} with ${friend.name}`);
  };

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <div className="rounded-[14px] border border-[#E9EEF5] bg-white px-7 py-5 text-center shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
            <div className="mx-auto h-[58px] w-[58px] overflow-hidden rounded-full">
              <Image
                src={friend.picture}
                alt={friend.name}
                width={58}
                height={58}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <h1 className="mt-3 text-[18px] font-semibold text-[#1F2937]">
              {friend.name}
            </h1>

            <div className="mt-2 flex flex-col items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold leading-none ${statusMeta.className}`}
              >
                {statusMeta.label}
              </span>

              {friend.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#DDF7E3] px-3 py-1 text-[10px] font-semibold uppercase text-[#2F855A]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-4 text-[14px] italic leading-6 text-[#7183A2]">
              &quot;{friend.bio}&quot;
            </p>
            <p className="mt-2 text-[14px] text-[#7C8DA8]">{friend.email}</p>
          </div>

          <div className="space-y-2">
            {actionButtons.map(({ label, icon: Icon, className }) => (
              <button
                key={label}
                type="button"
                className={`flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#E9EEF5] bg-white px-4 py-4 text-[14px] font-medium shadow-[0_3px_10px_rgba(15,23,42,0.03)] transition hover:bg-[#F8FAFC] ${className}`}
              >
                <Icon className="text-[16px]" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-3">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[10px] border border-[#E9EEF5] bg-white px-6 py-6 text-center shadow-[0_6px_18px_rgba(15,23,42,0.04)]"
              >
                <p className="text-[22px] font-semibold text-[#285446] md:text-[26px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[15px] text-[#73839D]">{stat.label}</p>
              </article>
            ))}
          </div>

          <article className="rounded-[10px] border border-[#E9EEF5] bg-white px-5 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[17px] font-semibold text-[#285446]">
                Relationship Goal
              </h2>
              <button
                type="button"
                className="rounded-[6px] border border-[#E6EBF2] bg-[#FAFBFC] px-4 py-2 text-[13px] font-medium text-[#2F3A4E] transition hover:bg-white"
              >
                Edit
              </button>
            </div>

            <p className="mt-4 text-[15px] text-[#73839D]">
              Connect every{" "}
              <span className="font-semibold text-[#1F2937]">
                {friend.goal} days
              </span>
            </p>
          </article>

          <article className="rounded-[10px] border border-[#E9EEF5] bg-white px-5 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <h2 className="text-[17px] font-semibold text-[#285446]">
              Quick Check-In
            </h2>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {quickCheckInActions.map(({ type, icon: Icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleQuickCheckIn(type)}
                  className="flex min-h-[72px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[8px] border border-[#E9EEF5] bg-[#FBFCFE] px-4 py-4 text-[15px] font-medium text-[#1F2937] transition hover:bg-white hover:text-[#244D3F]"
                >
                  <Icon className="text-[24px]" />
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-[10px] border border-[#E9EEF5] bg-white px-5 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[17px] font-semibold text-[#285446]">
                Recent Interactions
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#E6EBF2] bg-[#FAFBFC] px-3 py-2 text-[13px] font-medium text-[#2F3A4E] transition hover:bg-white"
              >
                <LuHistory className="text-[14px]" />
                Full History
              </button>
            </div>

            <div className="mt-4">
              {staticInteractions.map((interaction, index) => {
                const Icon = interaction.icon;

                return (
                  <div
                    key={`${interaction.title}-${index}`}
                    className={`flex items-start justify-between gap-4 py-3 ${
                      index !== staticInteractions.length - 1
                        ? "border-b border-[#ECF0F4]"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5 text-[#2F3A4E]">
                        <Icon className="text-[22px]" />
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-[#1F2937]">
                          {interaction.title}
                        </p>
                        <p className="text-[14px] text-[#73839D]">
                          {interaction.detail}
                        </p>
                      </div>
                    </div>

                    <p className="whitespace-nowrap pt-1 text-[13px] text-[#8A98AE]">
                      {interaction.date}
                    </p>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default FriendDetails;
