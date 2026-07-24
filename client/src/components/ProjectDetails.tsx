import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle2,
  Train,
  Plane,
  School,
  MapPin,
  ChevronRight,
  Sparkles,
  Building,
  Ruler,
  TreePine,
  Car,
} from 'lucide-react';

const projectStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(45px); }
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
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to { width: 3rem; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 8px rgba(234, 179, 8, 0.2); }
    50% { box-shadow: 0 0 25px rgba(234, 179, 8, 0.4); }
  }
  @keyframes borderTravel {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.5; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes iconBounce {
    0%, 100% { transform: scale(1) rotate(0deg); }
    30% { transform: scale(1.2) rotate(-8deg); }
    60% { transform: scale(0.95) rotate(4deg); }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  @keyframes tabSlide {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .proj-animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.7s ease-out forwards;
  }
  .proj-animate-scale-in {
    opacity: 0;
    animation: scaleIn 0.6s ease-out forwards;
  }
  .proj-animate-slide-left {
    opacity: 0;
    animation: slideInLeft 0.7s ease-out forwards;
  }
  .proj-animate-slide-right {
    opacity: 0;
    animation: slideInRight 0.7s ease-out forwards;
  }
  .proj-float {
    animation: float 7s ease-in-out infinite;
  }
  .proj-float-delayed {
    animation: float 9s ease-in-out infinite 3s;
  }

  /* ===== Section Background ===== */
  .project-section {
    position: relative;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f172a 65%, #1a1a2e 100%);
    overflow: hidden;
  }
  .project-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 15% 15%, rgba(234, 179, 8, 0.07) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 85%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 40%, rgba(234, 179, 8, 0.02) 0%, transparent 55%);
    pointer-events: none;
  }
  .project-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0);
    background-size: 40px 40px;
    pointer-events: none;
  }

  /* Section line */
  .proj-section-line {
    background: linear-gradient(90deg, #eab308, #f59e0b, #eab308);
    background-size: 200% 100%;
    animation: borderTravel 3s linear infinite;
    transition: width 0.5s ease;
  }
  .proj-section-line:hover {
    width: 7rem;
  }

  /* ===== Custom Tabs ===== */
  .proj-tabs-list {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border-radius: 1rem;
    padding: 6px;
    gap: 4px;
  }
  .proj-tab-trigger {
    position: relative;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    font-size: 0.875rem;
    padding: 12px 20px;
    border-radius: 0.75rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    border: 1px solid transparent;
  }
  .proj-tab-trigger::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(234, 179, 8, 0.15), rgba(234, 179, 8, 0.05));
    border-radius: 0.75rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .proj-tab-trigger:hover {
    color: rgba(255, 255, 255, 0.85);
    border-color: rgba(234, 179, 8, 0.15);
  }
  .proj-tab-trigger:hover::before {
    opacity: 1;
  }
  .proj-tab-trigger[data-state="active"] {
    background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(234, 179, 8, 0.08));
    color: #fbbf24;
    border-color: rgba(234, 179, 8, 0.3);
    box-shadow: 0 4px 20px -4px rgba(234, 179, 8, 0.25);
  }
  .proj-tab-trigger[data-state="active"]::before {
    opacity: 0;
  }

  /* Tab content animation */
  .proj-tab-content {
    animation: tabSlide 0.5s ease-out;
  }

  /* ===== Highlight Check Item ===== */
  .highlight-check {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid transparent;
  }
  .highlight-check:hover {
    background: rgba(234, 179, 8, 0.06);
    border-color: rgba(234, 179, 8, 0.15);
    transform: translateX(8px);
  }
  .highlight-check:hover .check-icon {
    transform: scale(1.15);
    color: #fbbf24;
  }
  .highlight-check:hover .check-text {
    color: #fbbf24;
  }
  .check-icon {
    transition: all 0.3s ease;
  }
  .check-text {
    transition: color 0.3s ease;
  }

  /* ===== Config Card ===== */
  .config-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .config-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, #eab308, #f59e0b, #fbbf24);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .config-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 0%, rgba(234, 179, 8, 0.1) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .config-card:hover {
    transform: translateY(-8px);
    border-color: rgba(234, 179, 8, 0.3);
    box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(234, 179, 8, 0.08);
    background: rgba(255, 255, 255, 0.07);
  }
  .config-card:hover::before {
    transform: scaleX(1);
  }
  .config-card:hover::after {
    opacity: 1;
  }
  .config-card:hover .config-type {
    text-shadow: 0 0 20px rgba(234, 179, 8, 0.3);
  }
  .config-card:hover .config-badge {
    background: linear-gradient(135deg, #eab308, #f59e0b);
    color: #0f172a;
    border-color: transparent;
  }
  .config-card:hover .config-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  .config-type {
    transition: all 0.3s ease;
  }
  .config-badge {
    transition: all 0.4s ease;
  }
  .config-arrow {
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s ease 0.1s;
  }

  /* ===== Stat Card ===== */
  .stat-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .stat-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 4px; height: 0;
    background: linear-gradient(to bottom, #eab308, rgba(234, 179, 8, 0.3));
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0 4px 4px 0;
  }
  .stat-card:hover::before {
    height: 100%;
  }
  .stat-card:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: rgba(234, 179, 8, 0.25);
    box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.07);
  }
  .stat-card:hover .stat-value {
    transform: scale(1.08);
    text-shadow: 0 0 25px rgba(234, 179, 8, 0.3);
  }
  .stat-card:hover .stat-icon {
    transform: scale(1.15) rotate(8deg);
    color: #fbbf24;
  }
  .stat-card:hover .stat-bar {
    animation: lineGrow 0.5s ease-out forwards;
  }
  .stat-value {
    transition: all 0.3s ease;
  }
  .stat-icon {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .stat-bar {
    width: 0;
  }

  /* ===== Development Card ===== */
  .dev-card {
    position: relative;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .dev-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, #eab308, #f59e0b, #fbbf24);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .dev-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(234, 179, 8, 0.1) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }
  .dev-card:hover {
    transform: translateY(-10px) scale(1.03);
    border-color: rgba(234, 179, 8, 0.35);
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(234, 179, 8, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }
  .dev-card:hover::before {
    transform: scaleX(1);
  }
  .dev-card:hover::after {
    opacity: 1;
  }
  .dev-card:hover .dev-icon-box {
    transform: rotate(-5deg) scale(1.1);
    box-shadow: 0 12px 30px -5px rgba(234, 179, 8, 0.5);
  }
  .dev-card:hover .dev-icon-box svg {
    animation: iconBounce 0.6s ease;
  }
  .dev-card:hover .dev-value {
    transform: scale(1.1);
    text-shadow: 0 0 30px rgba(234, 179, 8, 0.4);
  }
  .dev-card:hover .dev-label {
    color: #fbbf24;
  }
  .dev-card:hover .dev-desc {
    color: rgba(255, 255, 255, 0.75);
  }
  .dev-card:hover .dev-line {
    animation: lineGrow 0.5s ease-out forwards;
  }
  .dev-card:hover .dev-glow {
    opacity: 1;
  }

  .dev-icon-box {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .dev-value {
    transition: all 0.3s ease;
  }
  .dev-label {
    transition: color 0.3s ease;
  }
  .dev-desc {
    transition: color 0.3s ease;
  }
  .dev-line {
    width: 0;
  }
  .dev-glow {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  /* ===== Master Plan Image ===== */
  .masterplan-container {
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .masterplan-container:hover {
    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(234, 179, 8, 0.08);
  }
  .masterplan-container:hover .masterplan-img {
    transform: scale(1.05);
  }
  .masterplan-container:hover .masterplan-overlay {
    opacity: 1;
  }
  .masterplan-img {
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .masterplan-overlay {
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  /* ===== Highlights Image ===== */
  .highlights-image-container {
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .highlights-image-container:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(234, 179, 8, 0.08);
    transform: scale(1.02);
  }
  .highlights-image-container:hover .highlights-img {
    transform: scale(1.08);
    filter: brightness(0.85);
  }
  .highlights-image-container:hover .highlights-overlay {
    opacity: 1;
  }
  .highlights-img {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .highlights-overlay {
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  /* Star decorations */
  .star-twinkle {
    animation: starTwinkle 3s ease-in-out infinite;
  }

  /* Background SVG pattern */
  .svg-pattern {
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  @media (max-width: 768px) {
    .dev-card:hover {
      transform: translateY(-5px) scale(1.01);
    }
    .config-card:hover {
      transform: translateY(-5px);
    }
    .proj-tab-trigger {
      padding: 10px 14px;
      font-size: 0.8rem;
    }
  }
`;

interface Highlight {
  label: string;
  value: string;
  icon: React.ElementType;
  suffix: string;
  description: string;
  gradient: string;
}

export default function ProjectDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('highlights');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const projectHighlights = [
    'Modern architectural design with premium finishes',
    'Spacious floor plans with optimal natural light',
    'State-of-the-art amenities and facilities',
    'Strategic location with excellent connectivity',
    'Eco-friendly sustainable construction',
    'Premium security and safety features',
  ];

  const configurations = [
    { type: '1 BHK', area: '650 - 750 sq ft', price: 'Starting from ₹45 Lakhs', tag: 'Compact' },
    { type: '2 BHK', area: '1100 - 1300 sq ft', price: 'Starting from ₹75 Lakhs', tag: 'Popular' },
    { type: '3 BHK', area: '1600 - 1900 sq ft', price: 'Starting from ₹1.2 Cr', tag: 'Spacious' },
    { type: '4 BHK', area: '2200 - 2600 sq ft', price: 'Starting from ₹1.8 Cr', tag: 'Luxury' },
  ];

  const stats = [
    { label: 'Total Area', value: '25 Acres', icon: Ruler },
    { label: 'Total Units', value: '500+', icon: Building },
    { label: 'Green Space', value: '40%', icon: TreePine },
    { label: 'Parking', value: '1500+', icon: Car },
  ];

  const developmentHighlights: Highlight[] = [
    {
      label: 'Pune Ring Road',
      value: '2',
      icon: Car,
      suffix: 'km',
      description: 'Quick highway access',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Hinjewadi IT Park',
      value: '15',
      icon: Plane,
      suffix: 'km',
      description: 'Via expressway',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      label: 'Ghotawade Phata Metro',
      value: '1',
      icon: Train,
      suffix: 'km',
      description: 'Metro station nearby',
      gradient: 'from-amber-500 to-yellow-500',
    },
  ];

  const developmentFeatures = [
    'RERA approved project with clear legal titles',
    'Well-connected to Pune Ring Road for seamless travel',
    'Close proximity to Hinjewadi IT Park — ideal for professionals',
    'Just 1 km from Ghotawade Phata Metro Station',
    'Upcoming metro connectivity boosts future value',
    'Rapidly developing neighborhood with growing infrastructure',
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: projectStyles }} />

      <section
        ref={sectionRef}
        id="project"
        className="project-section py-20 md:py-32"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-24 right-[8%] w-96 h-96 rounded-full blur-3xl proj-float"
            style={{ background: 'rgba(234, 179, 8, 0.05)' }}
          />
          <div
            className="absolute bottom-32 left-[5%] w-72 h-72 rounded-full blur-3xl proj-float-delayed"
            style={{ background: 'rgba(99, 102, 241, 0.04)' }}
          />
          <div className="absolute inset-0 svg-pattern" />

          {/* Stars */}
          {[
            { top: '12%', left: '6%', delay: '0s' },
            { top: '22%', left: '93%', delay: '1.2s' },
            { top: '65%', left: '4%', delay: '0.6s' },
            { top: '78%', left: '90%', delay: '1.8s' },
            { top: '45%', left: '96%', delay: '2.4s' },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-yellow-400/30 star-twinkle"
              style={{ top: star.top, left: star.left, animationDelay: star.delay }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-14 max-w-2xl">
            <div
              className={`h-1 w-16 mb-6 rounded-full proj-section-line cursor-pointer ${
                isVisible ? 'proj-animate-fade-in-up' : 'opacity-0'
              }`}
            />

            <div className="flex items-center gap-3 mb-4">
              <h2
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white ${
                  isVisible ? 'proj-animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ fontFamily: 'var(--font-display)', animationDelay: '100ms' }}
              >
                Project{' '}
                <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Overview
                </span>
              </h2>
            </div>

            <p
              className={`text-lg text-slate-400 leading-relaxed ${
                isVisible ? 'proj-animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              Mount Castle represents the pinnacle of modern residential living,
              meticulously designed to exceed expectations and deliver unparalleled
              lifestyle experiences.
            </p>

            {/* Badges */}
            <div
              className={`flex flex-wrap gap-3 mt-6 ${
                isVisible ? 'proj-animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '300ms' }}
            >
              <div className="px-4 py-2 rounded-full flex items-center gap-2 bg-gradient-to-r from-yellow-500/15 to-amber-500/5 border border-yellow-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-300">Premium Project</span>
              </div>
              <div className="px-4 py-2 rounded-full flex items-center gap-2 bg-gradient-to-r from-emerald-500/15 to-green-500/5 border border-emerald-500/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-300">RERA Approved</span>
              </div>
            </div>
          </div>

          {/* Tabbed Content */}
          <div
            className={`${isVisible ? 'proj-animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '400ms' }}
          >
            <Tabs defaultValue="highlights" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="proj-tabs-list grid w-full grid-cols-3 mb-12">
                <TabsTrigger value="highlights" className="proj-tab-trigger">
                  Highlights
                </TabsTrigger>
                <TabsTrigger value="masterplan" className="proj-tab-trigger">
                  Master Plan
                </TabsTrigger>
                <TabsTrigger value="development" className="proj-tab-trigger">
                  Development
                </TabsTrigger>
              </TabsList>

              {/* ===== Highlights Tab ===== */}
              <TabsContent value="highlights" className="proj-tab-content space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="highlights-image-container rounded-2xl overflow-hidden shadow-2xl h-96 border border-white/10 cursor-pointer">
                    <img
                      src="/images/Screenshot_4.jpeg"
                      alt="Mount Castle Interior"
                      className="highlights-img w-full h-full object-cover"
                    />
                    <div className="highlights-overlay absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                      <div>
                        <p className="text-white font-bold text-lg flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          Mount Castle Living
                        </p>
                        <p className="text-white/60 text-sm mt-1">Premium interiors & design</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="flex flex-col justify-center space-y-2">
                    {projectHighlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="highlight-check flex items-start gap-4"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle2 className="check-icon w-6 h-6 text-yellow-500/70 flex-shrink-0 mt-0.5" />
                        <p className="check-text text-slate-300 text-lg">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* ===== Master Plan Tab ===== */}
              <TabsContent value="masterplan" className="proj-tab-content space-y-8">
                <div className="masterplan-container rounded-2xl overflow-hidden shadow-2xl h-[28rem] border border-white/10 cursor-pointer">
                  <img
                    src="/images/Mount Castle 3.png"
                    alt="Master Plan"
                    className="masterplan-img w-full h-full object-cover"
                  />
                  <div className="masterplan-overlay absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end justify-between p-6">
                    <div>
                      <p className="text-white font-bold text-lg flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        Master Plan Layout
                      </p>
                      <p className="text-white/60 text-sm mt-1">25 Acres of premium development</p>
                    </div>
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/10">
                      Click to expand
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="stat-card p-5 rounded-xl text-center cursor-pointer">
                        <IconComponent className="stat-icon w-5 h-5 text-slate-500 mx-auto mb-3" />
                        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-medium">
                          {stat.label}
                        </p>
                        <p
                          className="stat-value text-2xl font-bold text-yellow-400"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {stat.value}
                        </p>
                        <div className="stat-bar h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500/30 mt-3 mx-auto rounded-full" />
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* ===== Development Tab ===== */}
              <TabsContent value="development" className="proj-tab-content space-y-10">
                {/* Development Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {developmentHighlights.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className="dev-card p-8 rounded-2xl cursor-pointer text-center relative"
                      >
                        {/* Background Glow */}
                        <div className="dev-glow absolute inset-0 rounded-2xl bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />

                        {/* Icon */}
                        <div className="flex justify-center mb-6 relative z-[2]">
                          <div
                            className={`dev-icon-box p-5 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>

                        {/* Value */}
                        <div className="flex items-baseline justify-center gap-1 mb-2 relative z-[2]">
                          <span
                            className="dev-value text-5xl font-bold text-yellow-400"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {item.value}
                          </span>
                          <span className="text-2xl font-bold text-yellow-500/60">
                            {item.suffix}
                          </span>
                        </div>

                        {/* Label */}
                        <h4
                          className="dev-label text-lg font-bold text-white mb-2 relative z-[2]"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {item.label}
                        </h4>

                        {/* Description */}
                        <p className="dev-desc text-sm text-slate-400 mb-4 relative z-[2]">
                          {item.description}
                        </p>

                        {/* Line */}
                        <div className="dev-line h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500/30 mx-auto rounded-full relative z-[2]" />
                      </div>
                    );
                  })}
                </div>

                {/* Development Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {developmentFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="highlight-check flex items-start gap-4"
                    >
                      <CheckCircle2 className="check-icon w-5 h-5 text-yellow-500/70 flex-shrink-0 mt-0.5" />
                      <p className="check-text text-slate-300 text-base">{feature}</p>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href="#contact"
                    className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10">Schedule Site Visit</span>
                    <ChevronRight className="w-5 h-5 relative z-10" />
                  </a>
                  <a
                    href="#location"
                    className="px-8 py-4 border-2 border-yellow-500/30 text-yellow-400 font-bold rounded-xl hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                  >
                    <MapPin className="w-5 h-5" />
                    View Location
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}