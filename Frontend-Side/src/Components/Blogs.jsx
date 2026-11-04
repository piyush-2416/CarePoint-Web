import React from "react";
import {
  Users,
  ThumbsUp,
  MessageCircle,
  ArrowRight,
  Lightbulb,
  MessageSquare,
  Star,
  Heart,
} from "lucide-react";

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
  Suggestion: { color: "#059669", bg: "#ecfdf5", icon: MessageSquare },
  Feedback: { color: "#0284c7", bg: "#f0f9ff", icon: MessageCircle },
  Appreciation: { color: "#7c3aed", bg: "#f5f3ff", icon: Star },
  Idea: { color: "#d97706", bg: "#fffbeb", icon: Lightbulb },
  Experience: { color: "#e11d48", bg: "#fff1f2", icon: Heart },
};

const avatarColors = [
  { bg: "#ffedd5", fg: "#c2410c" },
  { bg: "#fce7f3", fg: "#be185d" },
  { bg: "#dbeafe", fg: "#1d4ed8" },
  { bg: "#ccfbf1", fg: "#0f766e" },
  { bg: "#ede9fe", fg: "#6d28d9" },
];

/* ───────── CARD ───────── */
function VoiceCard({ voice, colorIndex }) {
  const tag = tagStyles[voice.tag] ?? tagStyles.Suggestion;
  const TagIcon = tag.icon;
  const av = avatarColors[colorIndex % avatarColors.length];

  return (
    <article className="vb-card" style={{ borderLeftColor: tag.color }}>
      <header className="vb-top">
        <div className="vb-avatar" style={{ background: av.bg, color: av.fg }}>
          {voice.name.charAt(0)}
        </div>
        <div className="vb-who">
          <div className="vb-name">{voice.name}</div>
          <div className="vb-meta">
            {voice.flat} · {voice.time}
          </div>
        </div>
        <span className="vb-tag" style={{ background: tag.bg, color: tag.color }}>
          <TagIcon size={11} />
          {voice.tag}
        </span>
      </header>

      <p className="vb-msg">{voice.message}</p>

      <footer className="vb-foot">
        <div className="vb-stats">
          <span aria-label={`${voice.likes} likes`}>
            <ThumbsUp size={13} />
            {voice.likes}
          </span>
          <span aria-label={`${voice.comments} comments`}>
            <MessageCircle size={13} />
            {voice.comments}
          </span>
        </div>
        <button type="button" className="vb-more" aria-label={`Read more from ${voice.name}`}>
          Read more <ArrowRight size={12} />
        </button>
      </footer>
    </article>
  );
}

/* ───────── SECTION ───────── */
const Blogs = () => {
  return (
    <section className="vb" aria-labelledby="community-voices-heading">
      <style>{css}</style>

      <div className="vb-wrap">
        <div className="vb-head">
          <div>
            <div className="vb-eyebrow">
              <Users size={14} />
              Community Voices &amp; Blogs
            </div>
            <h2 id="community-voices-heading" className="vb-title">
              What your neighbours are saying
            </h2>
            <p className="vb-sub">
              Suggestions, feedback and thank-yous from the people who live here.
            </p>
          </div>

          <a href="/blogs" className="vb-all">
            View all <ArrowRight size={14} />
          </a>
        </div>

        <ul className="vb-list">
          {voices.map((voice, i) => (
            <li key={voice.id} className="vb-item">
              <VoiceCard voice={voice} colorIndex={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Blogs;

/* ───────── STYLES ───────── */
const css = `
.vb,.vb *{box-sizing:border-box;margin:0;padding:0;text-align:left;letter-spacing:normal}
.vb{width:100%;padding:32px 16px;background:linear-gradient(180deg,#f0fdf8,#fff);color:#0f172a;font-family:inherit}
.vb-wrap{max-width:1100px;margin:0 auto}

.vb-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap}
.vb-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#047857}
.vb-title{margin-top:6px;font-size:clamp(20px,3vw,26px);font-weight:800;line-height:1.2}
.vb-sub{margin-top:4px;font-size:13.5px;color:#64748b;line-height:1.5;max-width:520px}
.vb-all{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border:1px solid #a7f3d0;border-radius:99px;background:#fff;color:#047857;font-size:13px;font-weight:600;text-decoration:none}

.vb-list{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
.vb-item{display:flex;min-width:0}

.vb-card{width:100%;display:flex;flex-direction:column;gap:10px;padding:14px 16px;background:#fff;border:1px solid #e2e8f0;border-left:4px solid #059669;border-radius:14px}
.vb-top{display:flex;align-items:center;gap:10px}
.vb-avatar{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700}
.vb-who{flex:1;min-width:0}
.vb-name{font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vb-meta{margin-top:1px;font-size:11.5px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vb-tag{flex:none;display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:99px;font-size:10.5px;font-weight:700}

.vb-msg{font-size:13.5px;line-height:1.55;color:#475569;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

.vb-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-top:10px;border-top:1px solid #f1f5f9;margin-top:auto}
.vb-stats{display:flex;align-items:center;gap:14px;font-size:12px;color:#64748b}
.vb-stats span{display:inline-flex;align-items:center;gap:5px}
.vb-more{display:inline-flex;align-items:center;gap:4px;border:0;background:none;font:inherit;font-size:12.5px;font-weight:700;color:#059669;cursor:pointer}
.vb-more:hover{text-decoration:underline}

@media(max-width:900px){
  .vb-list{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;padding-bottom:6px;scrollbar-width:none}
  .vb-list::-webkit-scrollbar{display:none}
  .vb-item{flex:0 0 82%;scroll-snap-align:start}
}
@media(min-width:560px) and (max-width:900px){
  .vb-item{flex-basis:46%}
}
@media(max-width:600px){
  .vb{padding:24px 12px}
}
`;
