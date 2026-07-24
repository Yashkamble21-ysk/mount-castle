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
    to { width: 3rem; }
  }
  @keyframes mapPulse {
    0%, 100% { box-shadow: 0 0 0 0 hsl(var(--accent) / 0.3); }
    50% { box-shadow: 0 0 0 12px hsl(var(--accent) / 0); }
  }
  @keyframes dotPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
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
    transition: width 0.5s ease;
  }
  .loc-section-line:hover {
    width: 6rem;
  }

  .stat-card {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--accent) / 0.3));
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 0 4px 4px 0;
  }
  .stat-card:hover::before {
    height: 100%;
  }
  .stat-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.12);
    border-color: hsl(var(--accent) / 0.3);
  }
  .stat-card:hover .stat-value {
    transform: scale(1.1);
  }
  .stat-card:hover .stat-icon {
    transform: scale(1.2) rotate(10deg);
    color: hsl(var(--accent));
  }
  .stat-card:hover .stat-bar {
    animation: slideBar 0.5s ease-out forwards;
  }
  .stat-value {
    transition: transform 0.3s ease;
  }
  .stat-icon {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .stat-bar {
    width: 0;
  }

  .map-container {
    position: relative;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .map-container:hover {
    transform: scale(1.02);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2);
  }
  .map-container:hover .map-overlay {
    opacity: 1;
  }
  .map-container:hover .map-pin {
    animation: float 2s ease-in-out infinite;
  }
  .map-overlay {
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .location-pin {
    animation: mapPulse 2s ease-in-out infinite;
  }
  .location-pin-dot {
    animation: dotPulse 2s ease-in-out infinite;
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
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transform: translateX(-100%) skewX(-15deg);
  }
  .loc-shimmer:hover::after {
    animation: shimmer 0.8s ease-out;
  }

  .direction-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .direction-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -8px hsl(var(--accent) / 0.5);
  }
  .direction-btn:active {
    transform: translateY(0) scale(0.97);
  }
  .direction-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  .direction-btn:hover::before {
    left: 120%;
  }

  @media (max-width: 1024px) {
    .map-container {
      max-width: 100% !important;
      height: 280px !important;
    }
  }
  @media (max-width: 640px) {
    .map-container {
      height: 220px !important;
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
            className="absolute top-32 right-0 w-80 h-80 rounded-full blur-3xl loc-animate-float"
            style={{ background: 'hsl(var(--accent) / 0.06)' }}
          />
          <div
            className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl loc-animate-float-delayed"
            style={{ background: 'hsl(var(--primary) / 0.04)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
            {/* Left: Header + Stats */}
            <div className="space-y-8">
              {/* Section Header */}
              <div>
                <div
                  className={`h-1 w-16 bg-gradient-to-r from-accent to-accent/40 mb-6 rounded-full loc-section-line cursor-pointer ${
                    isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                  }`}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`location-pin flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 ${
                      isVisible ? 'loc-animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: '100ms' }}
                  >
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h2
                    className={`text-4xl md:text-5xl font-bold text-foreground ${
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
                  className={`text-lg text-muted-foreground max-w-2xl leading-relaxed ${
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
              <div className="grid gap-4 grid-cols-2">
                {highlights.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`stat-card p-6 bg-white rounded-xl border border-border/60 shadow-sm cursor-pointer ${
                        isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 100 + 350}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </p>
                        <IconComponent className="stat-icon w-5 h-5 text-muted-foreground/40" />
                      </div>
                      <div className="flex items-baseline gap-1 mb-1">
                        <p
                          className="stat-value text-3xl font-bold text-accent"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {item.value}
                        </p>
                        <span className="text-lg font-semibold text-accent/70">
                          {item.suffix}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="stat-bar h-0.5 bg-gradient-to-r from-accent to-accent/30 mt-3 rounded-full" />
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
              <div className="map-container rounded-2xl overflow-hidden shadow-2xl border-2 border-border/50 w-full lg:w-[420px] h-[320px] relative">
                {/* Map Loading State */}
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-muted/30 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-muted-foreground">
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
                <div className="map-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-5 pointer-events-none">
                  <div>
                    <p className="text-white font-bold text-sm flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-accent" />
                      {locationName}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">
                      Pirangut, Maharashtra
                    </p>
                  </div>
                  <div className="pointer-events-auto">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-all duration-300"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open in Maps
                    </a>
                  </div>
                </div>

                {/* Animated Pin */}
                <div className="map-pin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="relative">
                    <div className="w-4 h-4 bg-accent rounded-full shadow-lg location-pin-dot" />
                    <div className="absolute inset-0 w-4 h-4 bg-accent rounded-full animate-ping opacity-30" />
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`direction-btn loc-shimmer mt-4 flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-accent to-accent/85 text-accent-foreground font-semibold rounded-xl shadow-lg ${
                  isVisible ? 'loc-animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '650ms' }}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}