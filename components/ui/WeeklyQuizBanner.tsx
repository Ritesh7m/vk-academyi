"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Clock, BookOpen, Zap } from "lucide-react";

interface WeeklyQuiz {
  active: boolean;
  title: string;
  description: string;
  link: string;
  startDate?: string;
  endDate?: string;
}

function getDaysLeft(endDate?: string): number | null {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function WeeklyQuizBanner() {
  const [quiz, setQuiz] = useState<WeeklyQuiz | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then((data) => {
        if (data.weeklyQuiz?.active && data.weeklyQuiz?.link) {
          // Check expiry
          const q: WeeklyQuiz = data.weeklyQuiz;
          if (q.endDate) {
            const end = new Date(q.endDate);
            if (end < new Date()) return; // expired
          }
          setQuiz(q);
        }
      })
      .catch(() => {});
  }, []);

  if (!quiz || dismissed) return null;

  const daysLeft = getDaysLeft(quiz.endDate);

  return (
    <section
      className="relative w-full py-4 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #003366 0%, #0a4d8c 40%, #1a6bb5 70%, #FFB300 120%)",
      }}
      aria-label="Weekly Quiz"
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #FFB300 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)",
        }}
      />
      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-brand-gold/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: icon + text */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-brand-gold flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-brand-navy" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center gap-1 text-brand-gold text-[10px] font-extrabold uppercase tracking-widest">
                <Zap className="w-3 h-3 fill-brand-gold" /> Weekly Quiz
              </span>
              {daysLeft !== null && daysLeft > 0 && (
                <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <Clock className="w-2.5 h-2.5" />
                  {daysLeft === 1 ? "Last Day!" : `${daysLeft} days left`}
                </span>
              )}
            </div>
            <p className="text-white font-bold text-sm sm:text-base leading-snug">
              {quiz.title}
            </p>
            <p className="text-white/75 text-xs mt-0.5 hidden sm:block max-w-xl">
              {quiz.description}
            </p>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={quiz.link}
            target="_blank"
            rel="noopener noreferrer"
            id="weekly-quiz-cta-btn"
            className="quiz-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold text-brand-navy font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-[1.04] active:scale-[0.98] transition-all duration-200"
          >
            Take Quiz Now
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/50 hover:text-white/90 text-xs font-semibold transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
            aria-label="Dismiss quiz banner"
          >
            ✕
          </button>
        </div>
      </div>
    </section>
  );
}
