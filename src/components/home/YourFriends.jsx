"use client";

import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import FriendsGrid from "./FriendsGrid";

const YourFriends = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadFriends = async () => {
      try {
        const res = await fetch("/data.json", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch friends data.");
        }

        const data = await res.json();

        if (isMounted) {
          setFriends(data);
        }
      } catch (error) {
        if (error.name !== "AbortError" && isMounted) {
          console.error(error);
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFriends();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-[#1F2937] sm:text-[2rem]">
          Your Friends
        </h2>
      </div>

      {isLoading ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-[#E7ECF2] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col items-center gap-4">
            <ClipLoader
              color="#244D3F"
              loading
              size={54}
              speedMultiplier={0.9}
            />
            <p className="text-sm font-medium tracking-[0.08em] text-[#64748B] uppercase">
              Loading your friends...
            </p>
          </div>
        </div>
      ) : hasError ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-[28px] border border-[#F1D2D2] bg-white px-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
          <p className="max-w-md text-sm font-medium text-[#B42318]">
            We could not load your friends right now. Please refresh and try
            again.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {friends.map((friend) => (
            <FriendsGrid key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourFriends;
