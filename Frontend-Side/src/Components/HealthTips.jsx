import React, { useMemo, useState } from "react";
// import "./HealthTips.css";

const tips = [
  {
    id: 1,
    category: "Nutrition",
    title: "Build a Balanced Plate",
    description:
      "Include vegetables, fruits, whole grains and healthy protein sources in your daily meals.",
    icon: "🥗",
    color: "green",
    readTime: "4 min read",
  },
  {
    id: 2,
    category: "Fitness",
    title: "Stay Active Every Day",
    description:
      "Regular physical activity can improve your energy, mood and overall fitness.",
    icon: "🏃",
    color: "blue",
    readTime: "3 min read",
  },
  {
    id: 3,
    category: "Sleep",
    title: "Create a Better Sleep Routine",
    description:
      "Maintain a consistent sleep schedule and create a calm environment before bedtime.",
    icon: "😴",
    color: "purple",
    readTime: "5 min read",
  },
 
];

const categories = [
  "All",
  "Nutrition",
  "Fitness",
  "Sleep",
   
];

const HealthTips = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const categoryMatch =
        activeCategory === "All" || tip.category === activeCategory;

      const searchMatch =
        tip.title.toLowerCase().includes(search.toLowerCase()) ||
        tip.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <section className="health-tips">

      {/* ================= HEADER ================= */}

      <div className="health-header">

        <div className="health-heading">
          <span className="health-label">
            HEALTH & WELLNESS
          </span>

         
        </div>

       </div>


      {/* ================= FEATURED TIP ================= */}

      {/* <div className="featured-tip">

        <div className="featured-content">

          <div className="featured-tag">
            ✨ TIP OF THE DAY
          </div>

          <h2>
            Make hydration a
            <span> daily habit.</span>
          </h2>

        

        </div>

        <div className="featured-visual">

          <div className="water-circle">
            💧
          </div>

          <div className="bubble bubble-one"></div>
          <div className="bubble bubble-two"></div>
          <div className="bubble bubble-three"></div>

        </div>

      </div> */}


      {/* ================= CATEGORY FILTER ================= */}

      <div className="category-section">

        <div className="category-title">
          <h2>Explore Health Tips</h2>
          {/* <span>{filteredTips.length} tips</span> */}
        </div>

        {/* <div className="category-list">

          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}

        </div>*/}

      </div> 


      {/* ================= TIPS GRID ================= */}

      <div className="tips-grid">

        {filteredTips.map((tip, index) => (

          <article
            className={`tip-card ${tip.color}`}
            key={tip.id}
            style={{
              animationDelay: `${index * 0.08}s`,
            }}
          >

            <div className="tip-top">

              <div className="tip-icon">
                {tip.icon}
              </div>

              <span className="tip-category">
                {tip.category}
              </span>

            </div>

            <h3>{tip.title}</h3>

            <p>{tip.description}</p>

            <div className="tip-footer">

              <span>
                ◷ {tip.readTime}
              </span>

              <button>
                Read →
              </button>

            </div>

          </article>

        ))}

      </div>


      {/* ================= NO RESULT ================= */}

      {filteredTips.length === 0 && (
        <div className="no-results">
          <div>🔍</div>
          <h3>No health tips found</h3>
          <p>Try another keyword or category.</p>
        </div>
      )}

    </section>
  );
};

export default HealthTips;
