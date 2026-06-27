"use client";

import { useEffect, useState } from "react";
import {
  Megaphone,
  BookOpen,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Settings,
  ChevronDown,
} from "lucide-react";

interface Announcement {
  id: string;
  text: string;
  type: "success" | "info" | "warning" | "error";
  icon: string;
  active: boolean;
}

interface WeeklyQuiz {
  active: boolean;
  title: string;
  description: string;
  link: string;
  startDate: string;
  endDate: string;
}

interface CMSData {
  announcements: Announcement[];
  weeklyQuiz: WeeklyQuiz;
}

const TYPE_OPTIONS = [
  { value: "info", label: "Info (Blue)", color: "bg-blue-500" },
  { value: "success", label: "Success (Green)", color: "bg-emerald-500" },
  { value: "warning", label: "Warning (Orange)", color: "bg-amber-500" },
  { value: "error", label: "Urgent (Red)", color: "bg-rose-500" },
];

const ICON_OPTIONS = ["🎓", "📝", "🏆", "📅", "🔬", "🎉", "⚠️", "📢", "🎯", "✅", "❗", "🌟"];

const DEFAULT_CMS: CMSData = {
  announcements: [],
  weeklyQuiz: {
    active: false,
    title: "",
    description: "",
    link: "",
    startDate: "",
    endDate: "",
  },
};

export default function AdminPage() {
  const [cms, setCms] = useState<CMSData>(DEFAULT_CMS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"announcements" | "quiz">("announcements");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const ADMIN_PASSWORD = "vkadmin2026"; // simple client-side guard

  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then((data) => {
        setCms({
          announcements: data.announcements || [],
          weeklyQuiz: data.weeklyQuiz || DEFAULT_CMS.weeklyQuiz,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cms),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "Changes saved successfully!");
      } else {
        showToast("error", "Failed to save changes. Please try again.");
      }
    } catch {
      showToast("error", "Network error. Please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const addAnnouncement = () => {
    const newItem: Announcement = {
      id: Date.now().toString(),
      text: "",
      type: "info",
      icon: "📢",
      active: true,
    };
    setCms((prev) => ({ ...prev, announcements: [...prev.announcements, newItem] }));
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setCms((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    }));
  };

  const removeAnnouncement = (id: string) => {
    setCms((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((a) => a.id !== id),
    }));
  };

  const updateQuiz = (updates: Partial<WeeklyQuiz>) => {
    setCms((prev) => ({ ...prev, weeklyQuiz: { ...prev.weeklyQuiz, ...updates } }));
  };

  // Auth screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-navy to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-navy rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Settings className="w-8 h-8 text-brand-gold" />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">VK Academy CMS</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && password === ADMIN_PASSWORD) setAuthed(true);
                }}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors"
                placeholder="Enter password"
                autoFocus
              />
            </div>
            <button
              onClick={() => {
                if (password === ADMIN_PASSWORD) setAuthed(true);
                else showToast("error", "Incorrect password.");
              }}
              className="w-full py-3 rounded-xl bg-brand-navy text-white font-bold text-sm hover:bg-blue-900 transition-colors shadow-lg"
            >
              Login
            </button>
            {toast && (
              <p className="text-center text-xs text-rose-500 font-semibold">{toast.message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-brand-navy border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-semibold">Loading CMS data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[10000] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl font-semibold text-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center">
              <Settings className="w-4 h-4 text-brand-gold" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-brand-navy leading-none">
                VK Academy Admin
              </h1>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Content Management System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-navy transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              View Site <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-navy text-white font-bold text-sm hover:bg-blue-900 transition-all disabled:opacity-60 shadow-md"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit">
          {(["announcements", "quiz"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-brand-navy text-white shadow-md"
                  : "text-slate-500 hover:text-brand-navy hover:bg-slate-50"
              }`}
            >
              {tab === "announcements" ? (
                <Megaphone className="w-4 h-4" />
              ) : (
                <BookOpen className="w-4 h-4" />
              )}
              {tab === "announcements" ? "Announcements" : "Weekly Quiz"}
            </button>
          ))}
        </div>

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-brand-navy">Announcements</h2>
                <p className="text-slate-500 text-sm mt-0.5">
                  Manage the scrolling ticker at the top of the website.
                </p>
              </div>
              <button
                onClick={addAnnouncement}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold text-brand-navy font-bold text-sm hover:bg-amber-400 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Announcement
              </button>
            </div>

            {cms.announcements.length === 0 && (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                <Megaphone className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-400 font-semibold">No announcements yet.</p>
                <p className="text-slate-400 text-sm mt-1">Click &quot;Add Announcement&quot; to get started.</p>
              </div>
            )}

            <div className="space-y-3">
              {cms.announcements.map((ann, index) => (
                <AnnouncementCard
                  key={ann.id}
                  announcement={ann}
                  index={index}
                  onChange={(updates) => updateAnnouncement(ann.id, updates)}
                  onRemove={() => removeAnnouncement(ann.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Weekly Quiz Tab */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-brand-navy">Weekly Quiz</h2>
              <p className="text-slate-500 text-sm mt-0.5">
                Manage the weekly quiz banner displayed on the homepage.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              {/* Active toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-bold text-brand-navy text-sm">Show Quiz Banner</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    When enabled, the quiz banner will appear on the homepage.
                  </p>
                </div>
                <button
                  onClick={() => updateQuiz({ active: !cms.weeklyQuiz.active })}
                  className="transition-transform hover:scale-110"
                >
                  {cms.weeklyQuiz.active ? (
                    <ToggleRight className="w-10 h-10 text-emerald-500" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-slate-300" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Quiz Title *
                  </label>
                  <input
                    type="text"
                    value={cms.weeklyQuiz.title}
                    onChange={(e) => updateQuiz({ title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors"
                    placeholder="e.g. Weekly Science Quiz — Week 26"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={cms.weeklyQuiz.description}
                    onChange={(e) => updateQuiz({ description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors resize-none"
                    placeholder="Short description of the quiz…"
                    rows={2}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Google Form Link *
                  </label>
                  <input
                    type="url"
                    value={cms.weeklyQuiz.link}
                    onChange={(e) => updateQuiz({ link: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors"
                    placeholder="https://forms.google.com/..."
                  />
                  {cms.weeklyQuiz.link && (
                    <a
                      href={cms.weeklyQuiz.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-blue font-semibold mt-1.5 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" /> Test link
                    </a>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={cms.weeklyQuiz.startDate}
                    onChange={(e) => updateQuiz({ startDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    End Date (auto-expires)
                  </label>
                  <input
                    type="date"
                    value={cms.weeklyQuiz.endDate}
                    onChange={(e) => updateQuiz({ endDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors"
                  />
                </div>
              </div>

              {/* Preview */}
              {cms.weeklyQuiz.active && cms.weeklyQuiz.link && (
                <div className="p-4 rounded-xl bg-brand-navy/5 border border-brand-navy/20">
                  <p className="text-xs font-bold text-brand-navy uppercase tracking-widest mb-2">
                    Preview
                  </p>
                  <div className="rounded-xl overflow-hidden">
                    <div
                      className="p-4 flex items-center gap-3"
                      style={{
                        background: "linear-gradient(135deg, #003366 0%, #0a4d8c 60%, #FFB300 120%)",
                      }}
                    >
                      <div className="w-9 h-9 rounded-xl bg-brand-gold flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-brand-navy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-brand-gold text-[10px] font-extrabold uppercase tracking-widest">
                          ⚡ Weekly Quiz
                        </p>
                        <p className="text-white font-bold text-sm truncate">{cms.weeklyQuiz.title || "Quiz Title"}</p>
                        <p className="text-white/70 text-xs truncate">{cms.weeklyQuiz.description || "Description"}</p>
                      </div>
                      <span className="shrink-0 px-3 py-1.5 rounded-lg bg-brand-gold text-brand-navy font-extrabold text-xs">
                        Take Quiz →
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function AnnouncementCard({
  announcement,
  index,
  onChange,
  onRemove,
}: {
  announcement: Announcement;
  index: number;
  onChange: (updates: Partial<Announcement>) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(index === 0 || !announcement.text);
  const typeStyle = TYPE_OPTIONS.find((t) => t.value === announcement.type);

  return (
    <div
      className={`bg-white rounded-2xl border-2 shadow-sm transition-all duration-200 overflow-hidden ${
        announcement.active ? "border-slate-200" : "border-slate-100 opacity-60"
      }`}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange({ active: !announcement.active });
          }}
          className="shrink-0 transition-transform hover:scale-110"
          title={announcement.active ? "Deactivate" : "Activate"}
        >
          {announcement.active ? (
            <ToggleRight className="w-8 h-8 text-emerald-500" />
          ) : (
            <ToggleLeft className="w-8 h-8 text-slate-300" />
          )}
        </button>

        <span className="text-xl shrink-0">{announcement.icon}</span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-700 truncate">
            {announcement.text || (
              <span className="text-slate-400 italic">New announcement…</span>
            )}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`w-2 h-2 rounded-full ${typeStyle?.color ?? "bg-slate-400"}`}
            />
            <span className="text-xs text-slate-400 font-medium capitalize">
              {announcement.type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Expanded edit area */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Announcement Text *
            </label>
            <textarea
              value={announcement.text}
              onChange={(e) => onChange({ text: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors resize-none"
              placeholder="Type your announcement here…"
              rows={2}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Type / Color
              </label>
              <select
                value={announcement.type}
                onChange={(e) =>
                  onChange({ type: e.target.value as Announcement["type"] })
                }
                className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-brand-navy focus:outline-none text-sm font-medium transition-colors bg-white"
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Icon / Emoji
              </label>
              <div className="flex gap-1.5 flex-wrap">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => onChange({ icon })}
                    className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-all hover:scale-110 ${
                      announcement.icon === icon
                        ? "bg-brand-navy/10 ring-2 ring-brand-navy"
                        : "bg-slate-100 hover:bg-slate-200"
                    }`}
                    title={icon}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
