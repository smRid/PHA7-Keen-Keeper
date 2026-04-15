export const friendStatusMap = {
  Active: {
    label: "On-Track",
    className: "bg-[#295B4A] text-white",
  },
  "Due Soon": {
    label: "Almost Due",
    className: "bg-[#F2A93B] text-white",
  },
  Overdue: {
    label: "Overdue",
    className: "bg-[#F04444] text-white",
  },
  "On-track": {
    label: "On-Track",
    className: "bg-[#295B4A] text-white",
  },
  "Almost Due": {
    label: "Almost Due",
    className: "bg-[#F2A93B] text-white",
  },
};

export const getFriendStatusMeta = (status) =>
  friendStatusMap[status] ?? {
    label: status,
    className: "bg-slate-200 text-slate-700",
  };

export const formatCalendarDate = (dateValue) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));

export const formatTimelineDate = (dateValue) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));

export const getDerivedNextDueDate = (friend) => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const lastContactDate = new Date(today);
  lastContactDate.setDate(
    today.getDate() - Number(friend.days_since_contact ?? 0),
  );

  const nextDueDate = new Date(lastContactDate);
  nextDueDate.setDate(lastContactDate.getDate() + Number(friend.goal ?? 0));

  return nextDueDate;
};
