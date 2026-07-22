import { useState, useEffect, useRef } from "react";
import {
  Baby,
  Users,
  Leaf,
  Footprints,
  Lock,
  Zap,
  Video,
  ArrowUp,
  Waves,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const amenitiesStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-18px); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to { width: 3rem; }
  }
  @keyframes iconBounce {
    0%, 100% { transform: scale(1) rotate(0deg); }
    30% { transform: scale(1.25) rotate(-8deg); }
    60% { transform: scale(0.95) rotate(4deg); }
  }
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  @keyframes borderTravel {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  .amen-animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
  }
  .amen-animate-scale-in {
    opacity: 0;
    animation: scaleIn 0.7s ease-out forwards;
  }
  .amen-animate-slide-left {
    opacity: 0;
    animation: slideInLeft 0.7s ease-out forwards;
  }
  .amen-float {
    animation: float 7s ease-in-out infinite;
  }
  .amen-float-delayed {
    animation: float 9s ease-in-out infinite 3s;
  }
  .amen-float-slow {
    animation: float 11s ease-in-out infinite 1s;
  }

  /* ===== Section Background ===== */
  .amenities-section {
    position: relative;
    background:
      linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #0f172a 60%, #1a1a2e 100%);
    overflow: hidden;
  }
  .amenities-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 20%, rgba(234, 179, 8, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(234, 179, 8, 0.03) 0%, transparent 60%);
    pointer-events: none;
  }
  .amenities-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0);
    background-size: 40px 40px;
    pointer-events: none;
  }

  /* ===== Section Line ===== */
  .amen-section-line {
    transition: width 0.5s ease;
    background: linear-gradient(90deg, #eab308, #f59e0b, #eab308);
    background-size: 200% 100%;
    animation: borderTravel 3s linear infinite;
  }
  .amen-section-line:hover {
    width: 7rem;
  }

  /* ===== Amenity Card ===== */
  .amenity-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Animated top border */
  .amenity-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #eab308, #f59e0b, #fbbf24);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Background glow on hover */
  .amenity-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 30% 0%, rgba(234, 179, 8, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 100% 100%, rgba(99, 102, 241, 0.06) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .amenity-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(234, 179, 8, 0.3);
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(234, 179, 8, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .amenity-card:hover::before {
    transform: scaleX(1);
  }
  .amenity-card:hover::after {
    opacity: 1;
  }

  /* Icon box */
  .amenity-icon-box {
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
  }
  .amenity-card:hover .amenity-icon-box {
    background: linear-gradient(135deg, #eab308, #f59e0b);
    transform: rotate(-5deg) scale(1.08);
    box-shadow: 0 10px 30px -5px rgba(234, 179, 8, 0.5);
  }
  .amenity-card:hover .amenity-icon-box svg {
    color: #0f172a;
    animation: iconBounce 0.6s ease;
  }

  /* Title */
  .amenity-title {
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }
  .amenity-card:hover .amenity-title {
    color: #fbbf24;
    text-shadow: 0 0 20px rgba(234, 179, 8, 0.2);
  }

  /* Description */
  .amenity-desc {
    position: relative;
    z-index: 2;
    transition: color 0.3s ease;
  }
  .amenity-card:hover .amenity-desc {
    color: rgba(255, 255, 255, 0.8);
  }

  /* Bottom line */
  .amenity-line {
    width: 0;
    position: relative;
    z-index: 2;
  }
  .amenity-card:hover .amenity-line {
    animation: lineGrow 0.4s ease-out forwards;
  }

  /* Number */
  .amenity-number {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.4s ease;
    z-index: 2;
    position: relative;
  }
  .amenity-card:hover .amenity-number {
    opacity: 1;
    transform: translateX(0);
  }

  /* Arrow CTA */
  .amenity-arrow {
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s ease 0.15s;
    z-index: 2;
    position: relative;
  }
  .amenity-card:hover .amenity-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Card ripple on click */
  .card-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(234, 179, 8, 0.15);
    animation: ripple 0.6s ease-out forwards;
    pointer-events: none;
    z-index: 1;
  }

  /* ===== Highlight Card ===== */
  .highlight-card {
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .highlight-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 2px solid transparent;
    border-radius: 1.25rem;
    z-index: 5;
    transition: border-color 0.4s ease;
    pointer-events: none;
  }
  .highlight-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow:
      0 30px 60px -12px rgba(0, 0, 0, 0.5),
      0 0 40px rgba(234, 179, 8, 0.1);
  }
  .highlight-card:hover::before {
    border-color: rgba(234, 179, 8, 0.4);
  }
  .highlight-card:hover .highlight-img {
    transform: scale(1.15);
    filter: brightness(0.6) saturate(1.2);
  }
  .highlight-card:hover .highlight-overlay {
    background: linear-gradient(
      to top,
      rgba(15, 23, 42, 0.95) 0%,
      rgba(15, 23, 42, 0.5) 50%,
      rgba(15, 23, 42, 0.1) 100%
    );
  }
  .highlight-card:hover .highlight-content {
    transform: translateY(-12px);
  }
  .highlight-card:hover .highlight-accent-line {
    width: 3.5rem;
    background: linear-gradient(90deg, #eab308, #fbbf24);
  }
  .highlight-card:hover .highlight-cta {
    opacity: 1;
    transform: translateY(0);
  }
  .highlight-card:hover .highlight-tag-hover {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .highlight-card:hover .highlight-sparkle {
    opacity: 1;
  }

  .highlight-img {
    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .highlight-overlay {
    transition: all 0.5s ease;
  }
  .highlight-content {
    transition: transform 0.4s ease;
    position: relative;
    z-index: 6;
  }
  .highlight-accent-line {
    width: 0;
    transition: all 0.4s ease 0.1s;
  }
  .highlight-cta {
    opacity: 0;
    transform: translateY(12px);
    transition: all 0.4s ease 0.2s;
  }
  .highlight-tag-hover {
    opacity: 0;
    transform: translateY(5px) scale(0.9);
    transition: all 0.3s ease 0.15s;
  }
  .highlight-sparkle {
    opacity: 0;
    transition: opacity 0.4s ease 0.1s;
  }

  /* Badge */
  .highlight-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    transition: all 0.4s ease;
  }
  .highlight-card:hover .highlight-badge {
    transform: scale(1.1) rotate(-2deg);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  /* Shimmer */
  .highlight-shimmer::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    transform: translateX(-100%) skewX(-15deg);
    z-index: 5;
    pointer-events: none;
  }
  .highlight-card:hover .highlight-shimmer::after {
    animation: shimmer 1.2s ease-out;
  }

  /* ===== Counter Badge ===== */
  .counter-badge {
    background: linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0.05));
    border: 1px solid rgba(234, 179, 8, 0.2);
    backdrop-filter: blur(10px);
    transition: all 0.4s ease;
  }
  .counter-badge:hover {
    background: linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(234, 179, 8, 0.1));
    border-color: rgba(234, 179, 8, 0.4);
    transform: scale(1.05);
  }

  /* ===== Star decorations ===== */
  .star-decoration {
    animation: starTwinkle 3s ease-in-out infinite;
  }

  /* ===== Responsive ===== */
  @media (max-width: 768px) {
    .amenity-card:hover {
      transform: translateY(-5px);
    }
    .highlight-card:hover {
      transform: translateY(-5px) scale(1.01);
    }
  }
`;

interface Amenity {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

interface Highlight {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export default function Amenities() {
  const [isVisible, setIsVisible] = useState(false);
  const [highlightsVisible, setHighlightsVisible] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number; cardIndex: number }>
  >([]);
  const sectionRef = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setIsVisible(true);
          }
          if (entry.target === highlightsRef.current && entry.isIntersecting) {
            setHighlightsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (highlightsRef.current) observer.observe(highlightsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y, cardIndex: index }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const amenities: Amenity[] = [
    {
      icon: Lock,
      title: "Grand Entrance Gate",
      description:
        "Elegant gated entrance with enhanced security and premium design.",
      gradient: "from-amber-500/20 to-yellow-500/20",
    },
    {
      icon: Baby,
      title: "Children's Play Area",
      description:
        "Safe and engaging play area designed for children of all age groups.",
      gradient: "from-emerald-500/20 to-green-500/20",
    },
    {
      icon: Users,
      title: "Club House",
      description:
        "Modern clubhouse for recreation, celebrations, and community gatherings.",
      gradient: "from-blue-500/20 to-indigo-500/20",
    },
    {
      icon: Leaf,
      title: "Panoramic Nature Views",
      description:
        "Enjoy breathtaking panoramic views surrounded by lush greenery.",
      gradient: "from-teal-500/20 to-cyan-500/20",
    },
    {
      icon: Waves,
      title: "Water Connection",
      description:
        "Reliable water supply with modern infrastructure for everyday needs.",
      gradient: "from-sky-500/20 to-blue-500/20",
    },
    {
      icon: Zap,
      title: "Electricity Supply",
      description:
        "Well-planned electricity network ensuring uninterrupted power access.",
      gradient: "from-orange-500/20 to-amber-500/20",
    },
    {
      icon: ArrowUp,
      title: "Drainage System",
      description:
        "Efficient drainage system for proper rainwater and wastewater management.",
      gradient: "from-violet-500/20 to-purple-500/20",
    },
    {
      icon: Footprints,
      title: "Internal Roads",
      description:
        "Wide and well-developed internal roads for smooth and safe commuting.",
      gradient: "from-rose-500/20 to-pink-500/20",
    },
    {
      icon: Video,
      title: "Street Lighting",
      description:
        "Well-lit streets providing enhanced visibility and security at night.",
      gradient: "from-yellow-500/20 to-lime-500/20",
    },
  ];

  const highlights: Highlight[] = [
    {
      title: "Grand Entrance",
      description:
        "Beautifully designed entrance welcoming you to a premium lifestyle.",
      image: "/images/Screenshot 2026-07-22 125441.jpeg",
      tag: "Entrance",
    },
    {
      title: "Nature Living",
      description:
        "Experience peaceful surroundings with scenic panoramic nature views.",
      image: "/images/nature living.jpeg",
      tag: "Lifestyle",
    },
    {
      title: "Modern Infrastructure",
      description:
        "Complete infrastructure with roads, utilities, and secure development.",
      image: "/images/Mount Castle 1.png",
      tag: "Infrastructure",
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: amenitiesStyles }} />

      <section
        ref={sectionRef}
        id="amenities"
        className="amenities-section py-20 md:py-32"
      >
        {/* ===== Background Decorations ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          <div
            className="absolute top-20 right-[10%] w-96 h-96 rounded-full blur-3xl amen-float"
            style={{ background: "rgba(234, 179, 8, 0.05)" }}
          />
          <div
            className="absolute bottom-32 left-[5%] w-72 h-72 rounded-full blur-3xl amen-float-delayed"
            style={{ background: "rgba(99, 102, 241, 0.04)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl amen-float-slow"
            style={{
              background:
                "radial-gradient(circle, rgba(234, 179, 8, 0.03), transparent 70%)",
            }}
          />

          {/* Star decorations */}
          {[
            { top: "15%", left: "8%", delay: "0s", size: 3 },
            { top: "25%", left: "92%", delay: "1s", size: 2 },
            { top: "55%", left: "5%", delay: "2s", size: 2 },
            { top: "70%", left: "88%", delay: "0.5s", size: 3 },
            { top: "85%", left: "15%", delay: "1.5s", size: 2 },
            { top: "40%", left: "95%", delay: "2.5s", size: 2 },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute star-decoration rounded-full bg-yellow-400/30"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
              }}
            />
          ))}

          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* ===== Section Header ===== */}
          <div className="mb-16 max-w-2xl">
            <div
              className={`h-1 w-16 mb-6 rounded-full amen-section-line cursor-pointer ${
                isVisible ? "amen-animate-fade-in-up" : "opacity-0"
              }`}
            />

            <div className="flex items-center gap-3 mb-4">
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white ${
                  isVisible ? "amen-animate-fade-in-up" : "opacity-0"
                }`}
                style={{
                  fontFamily: "var(--font-display)",
                  animationDelay: "100ms",
                }}
              >
                Premium{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Amenities
                </span>
              </h2>
            </div>

            <p
              className={`text-lg text-slate-400 leading-relaxed ${
                isVisible ? "amen-animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              Experience a thoughtfully planned lifestyle with modern amenities,
              excellent infrastructure, and peaceful surroundings designed for
              comfortable living.
            </p>

            {/* Counter badges */}
            <div
              className={`flex flex-wrap gap-3 mt-6 ${
                isVisible ? "amen-animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "300ms" }}
            >
              <div className="counter-badge px-4 py-2 rounded-full flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-300">
                  9+ Amenities
                </span>
              </div>
              <div className="counter-badge px-4 py-2 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300">
                  Premium Living
                </span>
              </div>
            </div>
          </div>

          {/* ===== Amenities Grid ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              const number = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={index}
                  className={`amenity-card group p-7 md:p-8 rounded-2xl cursor-pointer ${
                    isVisible ? "amen-animate-scale-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 80 + 350}ms` }}
                  onClick={(e) => handleCardClick(e, index)}
                >
                  {/* Ripple effects */}
                  {ripples
                    .filter((r) => r.cardIndex === index)
                    .map((r) => (
                      <div
                        key={r.id}
                        className="card-ripple"
                        style={{
                          left: r.x - 25,
                          top: r.y - 25,
                          width: 50,
                          height: 50,
                        }}
                      />
                    ))}

                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-5 relative z-[2]">
                    <div
                      className={`amenity-icon-box p-4 rounded-xl bg-gradient-to-br ${amenity.gradient} border border-white/5`}
                    >
                      <Icon className="w-7 h-7 text-yellow-400" />
                    </div>
                    <span className="amenity-number text-xs font-bold text-yellow-500/30 mt-1 font-mono tracking-wider">
                      {number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className="amenity-title text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {amenity.title}
                  </h3>

                  <p className="amenity-desc text-slate-400 text-sm leading-relaxed mb-5">
                    {amenity.description}
                  </p>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-[2]">
                    <div className="amenity-line h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500/30 rounded-full" />
                    <div className="amenity-arrow flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                      Explore
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== Highlights ===== */}
          <div ref={highlightsRef} className="mt-24">
            {/* Highlights Header */}
            <div
              className={`flex items-center gap-4 mb-10 ${
                highlightsVisible ? "amen-animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Visual{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  Highlights
                </span>
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/30 to-transparent" />
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`highlight-card highlight-shimmer rounded-2xl overflow-hidden shadow-2xl h-72 md:h-80 lg:h-96 cursor-pointer ${
                    highlightsVisible ? "amen-animate-scale-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150 + 200}ms` }}
                >
                  {/* Badge */}
                  <div className="highlight-badge">
                    <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 shadow-lg">
                      {highlight.tag}
                    </span>
                  </div>

                  {/* Sparkle decoration */}
                  <div className="highlight-sparkle absolute top-4 left-4 z-10">
                    <Sparkles className="w-5 h-5 text-yellow-400 star-decoration" />
                  </div>

                  {/* Image */}
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="highlight-img w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="highlight-overlay absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6 md:p-7">
                    <div className="highlight-content">
                      {/* Accent Line */}
                      <div className="highlight-accent-line h-0.5 bg-yellow-500/50 rounded-full mb-3" />

                      <h3
                        className="text-xl md:text-2xl font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {highlight.title}
                      </h3>

                      <p className="text-white/75 text-sm leading-relaxed mb-4">
                        {highlight.description}
                      </p>

                      {/* CTA */}
                      <div className="highlight-cta">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 text-xs font-bold rounded-full shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-shadow">
                          View Details
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Hover tag */}
                    <div className="highlight-tag-hover absolute top-6 left-6">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 rounded-full text-xs font-bold shadow-lg">
                        ✨ {highlight.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}