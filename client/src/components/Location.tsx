import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  School,
  Hospital,
  Train,
  Plane,
  Navigation,
  ExternalLink,
} from 'lucide-react';

const locationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  @keyframes slideBar {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes mapPulse {
    0%, 100% { box-shadow: 0 0 0 0 hsl(var(--accent) / 0.4); }
    50% { box-shadow: 0 0 0 16px hsl(var(--accent) / 0); }
  }
  @keyframes dotPulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: hsl(var(--border)); }
    50% { border-color: hsl(var(--accent) / 0.4); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .loc-animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.7s ease-out forwards;
  }
  .loc-animate-slide-right {
    opacity: 0;
    animation: slideInRight 0.7s ease-out forwards;
  }
  .loc-animate-scale-in {
    opacity: 0;
    animation: scaleIn 0.6s ease-out forwards;
  }
  .loc-animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .loc-animate-float-delayed {
    animation: float 8s ease-in-out infinite 2s;
  }

  .loc-section-line {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .loc-section-line:hover {
    width: 6rem;
    box-shadow: 0 0 20px hsl(var(--accent) / 0.4);
  }

  .stat-card {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent) / 0.02) 100%);
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--accent) / 0.3));
    transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0 4px 4px 0;
    box-shadow: 0 0 12px hsl(var(--accent) / 0.5);
  }
  .stat-card::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, hsl(var(--accent) / 0.05) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .stat-card:hover::before {
    height: 100%;
  }
  .stat-card:hover::after {
    opacity: 1;
  }
  .stat-card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px hsl(var(--accent) / 0.1);
    border-color: hsl(var(--accent) / 0.3);
    background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--accent) / 0.05) 100%);
  }
  .stat-card:hover .stat-value {
    transform: scale(1.15);
    color: hsl(var(--accent));
  }
  .stat-card:hover .stat-icon {
    transform: scale(1.3) rotate(15deg);
    color: hsl(var(--accent));
    filter: drop-shadow(0 4px 8px hsl(var(--accent) / 0.3));
  }
  .stat-card:hover .stat-bar {
    animation: slideBar 0.6s ease-out forwards;
    box-shadow: 0 0 8px hsl(var(--accent) / 0.4);
  }
  .stat-card:hover .stat-label {
    color: hsl(var(--foreground));
  }
  
  .stat-value {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.7));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .stat-icon {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .stat-bar {
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.4), hsl(var(--accent)));
    background-size: 200% 100%;
    animation: gradientShift 3s ease infinite;
  }
  .stat-label {
    transition: color 0.3s ease;
  }

  .map-container {
    position: relative;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 24px;
    background: linear-gradient(135deg, hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.05));
  }
  .map-container::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .map-container:hover::before {
    opacity: 1;
  }
  .map-container:hover {
    transform: scale(1.03) translateY(-4px);
    box-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.25), 0 0 0 1px hsl(var(--accent) / 0.2);
  }
  .map-container:hover .map-overlay {
    opacity: 1;
  }
  .map-container:hover .map-pin {
    animation: float 2s ease-in-out infinite;
  }
  .map-container iframe {
    border-radius: 22px;
  }
  
  .map-overlay {
    opacity: 0;
    transition: opacity 0.5s ease;
    backdrop-filter: blur(8px);
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
  }

  .location-pin {
    animation: mapPulse 2.5s ease-in-out infinite;
  }
  .location-pin-dot {
    animation: dotPulse 2.5s ease-in-out infinite;
    box-shadow: 0 0 0 4px hsl(var(--accent) / 0.2), 0 4px 12px hsl(var(--accent) / 0.5);
  }

  .loc-shimmer {
    position: relative;
    overflow: hidden;
  }
  .loc-shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%) skewX(-15deg);
  }
  .loc-shimmer:hover::after {
    animation: shimmer 0.8s ease-out;
  }

  .direction-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.85) 100%);
    background-size: 200% 200%;
  }
  .direction-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px -10px hsl(var(--accent) / 0.6);
    background-position: 100% 0;
  }
  .direction-btn:active {
    transform: translateY(-1px) scale(0.98);
  }
  .direction-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transition: left 0.6s ease;
  }
  .direction-btn:hover::before {
    left: 120%;
  }
  .direction-btn svg {
    transition: transform 0.3s ease;
  }
  .direction-btn:hover svg {
    transform: rotate(45deg) scale(1.1);
  }

  .location-header-icon {
    background: linear-gradient(135deg, hsl(var(--accent) / 0.15), hsl(var(--accent) / 0.05));
    border: 2px solid hsl(var(--accent) / 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .location-header-icon:hover {
    transform: scale(1.1) rotate(10deg);
    border-color: hsl(var(--accent) / 0.4);
    box-shadow: 0 8px 16px hsl(var(--accent) / 0.2);
  }

  .map-badge {
    backdrop-filter: blur(12px);
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .map-badge:hover {
    background: rgba(255,255,255,0.3);
    border-color: rgba(255,255,255,0.2);
    transform: scale(1.05);
  }

  @media (max-width: 1024px) {
    .map-container {
      max-width: 100% !important;
      height: 320px !important;
    }
    .stat-card {
      padding: 1.25rem !important;
    }
  }
  
  @media (max-width: 640px) {
    .map-container {
      height: 280px !important;
      border-radius: 16px;
    }
    .map-container iframe {
      border-radius: 14px;
    }
    .stat-card {
      padding: 1rem !important;
    }
    .stat-value {
      font-size: 1.875rem !important;
    }
  }
`;

interface Highlight {
  label: string;
  value: string;
  icon: React.ElementType;
  suffix: string;
  description: string;
}

export default function Location() {
  const [isVisible, setIsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Updated Location details
  const locationName = "Mount Castle";
  const locationAddress = "Mount Castle, Ambedwet, Sutarwadi, Pirangut, Maharashtra 412115";
  const mapsUrl = "https://maps.app.goo.gl/fZKxh8NxXEv1rEFAG";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationAddress)}`;
  
  // Extract embed URL from the share link
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.123!2d73.7234!3d18.4567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f1234567890a%3A0x1234567890abcdef!2sMount%20Castle%2C%20Ambedwet%2C%20Sutarwadi%2C%20Pirangut%2C%20Maharashtra%20412115!5e0!3m2!1sen!2sin!4v1234567890";

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

  const highlights: Highlight[] = [
    {
      label: 'Pune Ring Road',
      value: '2',
      icon: Train,
      suffix: 'km',
      description: 'Quick highway access',
    },
    {
      label: 'Hinjewadi IT Park',
      value: '15',
      icon: Plane,
      suffix: 'km',
      description: 'Via expressway',
    },
    {
      label: 'Ghotawade Phata Metro',
      value: '1',
      icon: Train,
      suffix: 'km',
      description: 'Metro station nearby',
    },
    {
      label: 'Schools & Hospitals',
      value: '3',
      icon: Hospital,
      suffix: 'km',
      description: 'Essential amenities',
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: locationStyles }} />

      <section
        ref={sectionRef}
        id="location"
        className="py-20 md:py-32 bg-gradient-to-b from-background via-accent/3 to-background relative overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-32 right-0 w-96 h-96 rounded-full blur-3xl loc-animate-float opacity-60"
            style={{ background: 'hsl(var(--accent) / 0.08)' }}
          />
          <div
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl loc-animate-float-delayed opacity-50"
            style={{ background: 'hsl(var(--primary) / 0.06)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
            {/* Left: Header + Stats */}
            <div className="space-y-10">
              {/* Section Header */}
              <div>
                <div
                  className={`h-1.5 w-16 bg-gradient-to-r from-accent via-accent to-accent/40 mb-6 rounded-full loc-section-line cursor-pointer ${
                    isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                  }`}
                />
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`location-header-icon location-pin flex items-center justify-center w-14 h-14 rounded-2xl ${
                      isVisible ? 'loc-animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '100ms' }}
                  >
                    <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <h2
                    className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground ${
                      isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{
                      fontFamily: 'var(--font-display)',
                      animationDelay: '150ms',
                    }}
                  >
                    Prime Location
                  </h2>
                </div>
                <p
                  className={`text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed ${
                    isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '250ms' }}
                >
                  Mount Castle is strategically located in Pirangut, offering
                  unparalleled connectivity to major IT hubs, metro connectivity,
                  and rapidly developing infrastructure.
                </p>
              </div>

              {/* Highlight Stats Grid */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                {highlights.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`stat-card p-6 bg-white rounded-2xl border-2 border-border/60 shadow-md cursor-pointer ${
                        isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 100 + 350}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <p className="stat-label text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          {item.label}
                        </p>
                        <IconComponent className="stat-icon w-6 h-6 text-muted-foreground/50" />
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p
                          className="stat-value text-4xl md:text-5xl font-bold"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {item.value}
                        </p>
                        <span className="text-xl font-bold text-accent/70">
                          {item.suffix}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="stat-bar rounded-full" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Map */}
            <div
              className={`lg:mt-12 ${
                isVisible ? 'loc-animate-slide-right' : 'opacity-0'
              }`}
              style={{ animationDelay: '500ms' }}
            >
              <div className="map-container overflow-hidden w-full lg:w-full h-[360px] lg:h-[480px] relative">
                {/* Map Loading State */}
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center z-10 rounded-[22px]">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Loading map...
                      </span>
                    </div>
                  </div>
                )}
                <iframe
                  className="w-full h-full"
                  frameBorder="0"
                  src={embedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  title={locationName}
                />

                {/* Map Hover Overlay */}
                <div className="map-overlay absolute inset-0 flex items-end justify-between p-6 pointer-events-none rounded-[22px]">
                  <div>
                    <p className="text-white font-bold text-base flex items-center gap-2 drop-shadow-lg">
                      <MapPin className="w-5 h-5 text-accent drop-shadow-glow" />
                      {locationName}
                    </p>
                    <p className="text-white/80 text-sm mt-1 drop-shadow-md">
                      Pirangut, Maharashtra
                    </p>
                  </div>
                  <div className="pointer-events-auto">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-badge flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in Maps
                    </a>
                  </div>
                </div>

                {/* Animated Pin */}
                <div className="map-pin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                  <div className="relative">
                    <div className="w-5 h-5 bg-accent rounded-full location-pin-dot" />
                    <div className="absolute inset-0 w-5 h-5 bg-accent rounded-full animate-ping opacity-40" />
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`direction-btn loc-shimmer mt-6 flex items-center justify-center gap-3 w-full px-8 py-4 text-accent-foreground font-bold text-base rounded-2xl shadow-xl ${
                  isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '650ms' }}
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}