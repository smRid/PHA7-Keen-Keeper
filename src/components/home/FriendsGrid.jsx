import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getFriendStatusMeta } from "@/lib/friend-ui";

const FriendsGrid = ({ friend }) => {
  const statusInfo = getFriendStatusMeta(friend.status);

  return (
    <Link
      href={`/friends/${friend.id}`}
      className="card h-full rounded-[22px] border border-[#E7ECF2] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(15,23,42,0.1)]"
    >
      <figure className="px-10 pt-10">
        <Image
          src={friend.picture}
          alt={friend.name}
          width={84}
          height={84}
          className="h-[84px] w-[84px] rounded-full object-cover"
        />
      </figure>
      <div className="card-body items-center px-6 pb-8 pt-3 text-center">
        <h2 className="card-title text-center text-[1.8rem] font-semibold leading-tight text-[#1F2937]">
          {friend.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-[#94A3B8]">
          {friend.days_since_contact}d ago
        </p>
        <p className="mt-1 flex flex-wrap justify-center gap-2">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#DDF7E3] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#2F855A]"
            >
              {tag}
            </span>
          ))}
        </p>
        <p
          className={`mt-1 rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}
        >
          {statusInfo.label}
        </p>
      </div>
    </Link>
  );
};

export default FriendsGrid;
