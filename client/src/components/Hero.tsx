import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

/**
 * Hero Section Component
 * Features: Full-width background image, overlay text, animated CTAs, scroll indicator
 * Design: Dramatic, luxury positioning with left-aligned text
 */
export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/0721 (3).mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 max-w-2xl">
        <div className="animate-fade-in">
          {/* Accent Line */}
          <div className="h-1 w-16 bg-accent mb-6" />

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Where Architecture Meets Aspiration
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
            Discover Mount Castle, a premium residential development combining modern architecture with timeless elegance. Experience luxury living at its finest.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base transition-all duration-300 hover:scale-105 active:scale-97"
            >
              Schedule Your Private Tour
            </Button>
            <Button
              onClick={() => scrollToSection('project')}
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-base transition-all duration-300 hover:scale-105 active:scale-97"
            >
              Download Brochure
            </Button>
          </div>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white font-semibold hover:text-accent transition-colors duration-200 flex items-center gap-2"
          >
            Enquire Now
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/70" />
      </div>
    </section>
  );
}
