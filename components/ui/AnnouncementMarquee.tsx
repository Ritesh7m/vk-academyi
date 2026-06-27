"use client";

import { useEffect, useState, useRef } from "react";
import { X, Megaphone } from "lucide-react";

interface Announcement {
  id: string;
  text: string;
  type: "success" | "info" | "warning" | "error";
  icon: string;
  active: boolean;
}

const TYPE_STYLES: Record<string, { bg: string; text: string; badge: string }> = {
  success: {
    bg: "from-emerald-600 to-teal-600",
    text: "text-white",
    badge: "bg-white/20 text-white",
  },
  info: {
    bg: "from-brand-navy to-blue-700",
    text: "text-white",
    badge: "bg-white/20 text-white",
  },
  warning: {
    bg: "from-amber-500 to-orange-500",
    text: "text-white",
    badge: "bg-white/25 text-white",
  },
  error: {
    bg: "from-rose-600 to-red-600",
    text: "text-white",
    badge: "bg-white/20 text-white",
  },
};

export default function AnnouncementMarquee() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then((data) => {
        const active = (data.announcements || []).filter(
          (a: Announcement) => a.active
        );
        setAnnouncements(active);
      })
      .catch(() => {});
  }, []);

  // Cycle through announcement types for the bg gradient
  useEffect(() => {
    if (announcements.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentTypeIndex((i) => (i + 1) % announcements.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [announcements]);

  if (dismissed || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentTypeIndex];
  const style = TYPE_STYLES[currentAnnouncement?.type ?? "info"];

  // Build the full scroll track: repeat announcements so marquee loops seamlessly
  const track = [...announcements, ...announcements, ...announcements];

  return (
    <div
      className={`relative w-full bg-gradient-to-r ${style.bg} overflow-hidden`}
      style={{ minHeight: "36px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left label */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-1.5 px-3 shrink-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 100%)",
        }}
      >
        <Megaphone className="w-3.5 h-3.5 text-white/90 shrink-0" />
        <span className="text-white/90 text-[10px] font-extrabold uppercase tracking-widest hidden sm:block whitespace-nowrap">
          Updates
        </span>
        <div className="w-px h-4 bg-white/30 ml-1 hidden sm:block" />
      </div>

      {/* Scrolling track */}
      <div
        className="announcement-track flex items-center gap-0"
        style={{
          animationPlayState: paused ? "paused" : "running",
          paddingLeft: "0",
        }}
      >
        {track.map((ann, idx) => {
          const s = TYPE_STYLES[ann.type] ?? TYPE_STYLES.info;
          return (
            <div
              key={`${ann.id}-${idx}`}
              className="flex items-center gap-2 px-6 py-2 shrink-0"
            >
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.badge} whitespace-nowrap`}>
                {ann.icon}
              </span>
              <span className="text-white text-xs font-semibold whitespace-nowrap">
                {ann.text}
              </span>
              <span className="text-white/40 mx-2 text-base font-thin">◆</span>
            </div>
          );
        })}
      </div>

      {/* Right dismiss */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all"
        aria-label="Dismiss announcements"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
