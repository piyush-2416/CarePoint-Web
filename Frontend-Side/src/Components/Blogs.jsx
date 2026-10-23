import React from "react";
import {
  Users,
  Quote,
  ThumbsUp,
  MessageCircle,
  ArrowRight,
  Lightbulb,
  MessageSquare,
  Star,
  Heart,
} from "lucide-react";

/* NOTE: spacing / alignment / width classes use the "!" (important) prefix on purpose.
   Your project's global CSS overrides plain Tailwind padding, margin and text-align,
   so "!" makes this section immune to it. Still 100% Tailwind. */

/* ───────── DATA ───────── */
const voices = [
  {
    id: 1,
    name: "Rahul Sharma",
    flat: "A-101",
    time: "2 hours ago",
    tag: "Suggestion",
    message:
      "Community park mein agar aur plants lagaye jayein toh area aur beautiful lagega. Isse hawa bhi fresh rahegi aur bachchon ke liye bhi behtar hoga.",
    likes: 24,
    comments: 6,
  },
  {
    id: 2,
    name: "Anjali Singh",
    flat: "B-302",
    time: "5 hours ago",
    tag: "Feedback",
    message:
      "The MyCommunity app is really helpful. However, I feel the event section can be more organized. It would be great if we could filter events by date and category.",
    likes: 18,
    comments: 4,
  },
  {
    id: 3,
    name: "Amit Gupta",
    flat: "B-105",
    time: "1 day ago",
    tag: "Appreciation",
    message:
      "A big thank you to our maintenance team for the quick response on the water supply issue. Truly appreciate your hard work and dedication!",
    likes: 32,
    comments: 3,
  }, 
];

const tagStyles = {
  Suggestion: { bg: "bg-emerald-50", text: "text-emerald-700", icon: MessageSquare },
  Feedback: { bg: "bg-sky-50", text: "text-sky-700", icon: MessageCircle },
  Appreciation: { bg: "bg-violet-50", text: "text-violet-700", icon: Star },
  Idea: { bg: "bg-amber-50", text: "text-amber-700", icon: Lightbulb },
  Experience: { bg: "bg-rose-50", text: "text-rose-700", icon: Heart },
};

const avatarColors = [
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-purple-100 text-purple-700",
];

/* ───────── CARD ───────── */
function VoiceCard({ voice, colorIndex }) {
  const tag = tagStyles[voice.tag] ?? tagStyles.Suggestion;
  const TagIcon = tag.icon;

  return (
    <article className="flex flex-col bg-white shadow-sm hover:shadow-md !p-5 sm:!p-6 border border-emerald-100 rounded-2xl h-full !text-left transition hover:-translate-y-0.5">
      {/* Author + tag */}
      <header className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              avatarColors[colorIndex % avatarColors.length]
            }`}
          >
            {voice.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 text-sm !text-left truncate">{voice.name}</p>
            <p className="!mt-1 text-slate-500 text-xs !text-left truncate">
              {voice.flat} &middot; {voice.time}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full !px-3 !py-1 text-[11px] font-semibold ${tag.bg} ${tag.text}`}
        >
          <TagIcon size={12} />
          {voice.tag}
        </span>
      </header>

      {/* Message */}
      <div className="flex flex-1 gap-3 !mt-5">
        <Quote size={16} className="!mt-1.5 text-emerald-300 shrink-0" fill="currentColor" aria-hidden="true" />
        <p className="text-[15px] text-slate-600 !text-left line-clamp-3 leading-7">{voice.message}</p>
      </div>

      {/* Footer */}
      <footer className="flex justify-between items-center gap-3 !mt-6 !pt-4 border-slate-100 border-t">
        <div className="flex items-center gap-4 text-slate-500 text-xs">
          <span className="inline-flex items-center gap-1.5" aria-label={`${voice.likes} likes`}>
            <ThumbsUp size={14} className="text-emerald-500" />
            {voice.likes}
          </span>
          <span className="inline-flex items-center gap-1.5" aria-label={`${voice.comments} comments`}>
            <MessageCircle size={14} className="text-slate-400" />
            {voice.comments}
          </span>
        </div>

        <button
          type="button"
          aria-label={`Read more from ${voice.name}`}
          className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 !px-3.5 !py-1.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-2 font-semibold text-emerald-700 text-xs transition-colors"
        >
          Read more
          <ArrowRight size={13} />
        </button>
      </footer>
    </article>
  );
}

/* ───────── SECTION ───────── */
const Blogs = () => {
  return (
    <section
      aria-labelledby="community-voices-heading"
      className="bg-gradient-to-b from-emerald-50/60 to-white !py-12 sm:!py-16 lg:!py-20 w-full overflow-hidden !text-left"
    >
      <div className="!mx-auto !px-4 sm:!px-6 lg:!px-8 !max-w-6xl">
        {/* Header */}
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-end gap-5">
          <div>
            <p className="inline-flex items-center gap-2 font-semibold text-emerald-700 text-xs sm:text-sm !text-left">
              <Users size={15} />
              Community Voices &amp; Blogs
            </p>
            <h2
              id="community-voices-heading"
              className="!mt-3 font-bold text-slate-900 text-2xl sm:text-3xl !text-left tracking-tight"
            >
              What your neighbours are saying
            </h2>
            <p className="!mt-3 !max-w-xl text-slate-500 text-sm sm:text-base !text-left leading-6">
              Suggestions, feedback and thank-yous from the people who live here.
            </p>
          </div>

          <a
            href="/blogs"
            className="inline-flex items-center self-start sm:self-auto gap-2 bg-white hover:bg-emerald-50 !px-5 !py-2.5 border border-emerald-200 rounded-full font-semibold text-emerald-700 text-sm transition-colors"
          >
            View all
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Cards: swipe row on mobile/tablet, 3-column grid on desktop */}
        <ul className="[&::-webkit-scrollbar]:hidden flex gap-4 lg:gap-6 lg:grid lg:grid-cols-3 !mt-8 sm:!mt-10 !pb-4 lg:!pb-0 lg:overflow-visible overflow-x-auto snap-mandatory snap-x list-none [scrollbar-width:none]">
          {voices.map((voice, i) => (
            <li key={voice.id} className="!w-[85%] sm:!w-[46%] lg:!w-auto snap-start shrink-0">
              <VoiceCard voice={voice} colorIndex={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blogs;
