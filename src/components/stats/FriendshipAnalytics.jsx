"use client";

import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { readTimelineEntries, TIMELINE_UPDATED_EVENT } from "@/lib/timeline";

const interactionPalette = [
  { key: "Text", name: "Text", fill: "#6D34E5" },
  { key: "Call", name: "Call", fill: "#255646" },
  { key: "Video", name: "Video", fill: "#37A865" },
];

const InteractionLegend = ({ items = [] }) => (
  <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#61728A]">
    {items.map((entry) => (
      <div key={entry.key} className="flex items-center gap-2">
        <span
          className="h-[7px] w-[7px] rounded-full"
          style={{ backgroundColor: entry.fill }}
        />
        <span>{entry.name}</span>
      </div>
    ))}
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];

  return (
    <div className="rounded-[10px] border border-[#DCE4EF] bg-white px-3 py-2 text-[13px] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <p className="font-medium text-[#1E293B]">{item.name}</p>
      <p className="mt-1 text-[#61728A]">{item.value} interactions</p>
    </div>
  );
};

const FriendshipAnalytics = () => {
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

  const chartData = interactionPalette.map((interaction) => ({
    ...interaction,
    value: entries.filter((entry) => entry.type === interaction.key).length,
  }));

  const hasChartData = chartData.some((item) => item.value > 0);

  return (
    <section className="mx-auto flex w-full max-w-[1110px] flex-1 flex-col px-5 py-10 sm:px-6 md:py-12">
      <h1 className="text-[44px] font-bold leading-none tracking-[-0.04em] text-[#1E293B] sm:text-[52px]">
        Friendship Analytics
      </h1>

      <article className="mt-6 min-h-[390px] rounded-[8px] border border-[#DCE4EF] bg-white px-7 py-8">
        <h2 className="text-[15px] font-semibold text-[#285446]">
          By Interaction Type
        </h2>

        <div className="mt-6 flex min-h-[290px] flex-col items-center justify-center">
          {hasChartData ? (
            <>
              <div className="h-[210px] w-full max-w-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={58}
                      outerRadius={84}
                      cornerRadius={12}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.key} fill={entry.fill} />
                      ))}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <InteractionLegend items={chartData} />
            </>
          ) : (
            <div className="text-center text-[15px] text-[#73839D]">
              No call, text, or video interactions yet.
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default FriendshipAnalytics;
