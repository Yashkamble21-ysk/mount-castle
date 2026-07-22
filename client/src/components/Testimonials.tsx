export default function Testimonials() {
  const testimonials = [
    { image: "/images/Abhishekh Jha.jpeg" },
    { image: "/images/Ajit Kumar.jpeg" },
    { image: "/images/Aniket Awtani.jpeg" },
    { image: "/images/Kalpesh Bhawsar.jpeg" },
    { image: "/images/MR Krishna Malge.jpeg" },
    { image: "/images/MR Utkarsh Ghate.jpeg" },
    { image: "/images/Ranjeet Shinde.jpeg" },
  ];

  return (
    <>
      <style>{`
        .testimonial-slider {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 32px 0;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 4%,
            black 96%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 4%,
            black 96%,
            transparent
          );
        }

        .testimonial-track {
          display: flex;
          gap: 28px;
          width: max-content;
          animation: testimonialScroll 50s linear infinite;
        }

        .testimonial-slider:hover .testimonial-track {
          animation-play-state: paused;
        }

        @keyframes testimonialScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* ===== Card: 3 visible on desktop ===== */
        .testimonial-card {
          /* calc: (viewport - container padding - 2 gaps) / 3 */
          width: clamp(280px, calc((100vw - 120px) / 3), 480px);
          aspect-ratio: 3 / 4;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 24px;
          padding: 14px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);
          border: 1.5px solid rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .testimonial-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 24px 64px rgba(234, 179, 8, 0.22);
          border-color: rgba(234, 179, 8, 0.5);
        }

        .testimonial-image-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: #f5f5f5;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .testimonial-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-card:hover .testimonial-image {
          transform: scale(1.03);
        }

        /* ===== 2XL screens (1536px+) — 3 large cards ===== */
        @media (min-width: 1536px) {
          .testimonial-card {
            width: clamp(420px, calc((100vw - 140px) / 3), 540px);
            padding: 18px;
            border-radius: 28px;
          }
          .testimonial-image-wrapper {
            border-radius: 20px;
          }
          .testimonial-track {
            gap: 36px;
          }
        }

        /* ===== Tablet (769px – 1024px) — 2 cards visible ===== */
        @media (max-width: 1024px) {
          .testimonial-card {
            width: clamp(300px, calc((100vw - 90px) / 2), 420px);
            padding: 14px;
            border-radius: 22px;
          }
          .testimonial-image-wrapper {
            border-radius: 16px;
          }
          .testimonial-track {
            gap: 24px;
            animation-duration: 40s;
          }
        }

        /* ===== Mobile (≤768px) — 1 card + peek ===== */
        @media (max-width: 768px) {
          .testimonial-card {
            width: clamp(270px, calc(100vw - 80px), 380px);
            padding: 12px;
            border-radius: 20px;
          }
          .testimonial-image-wrapper {
            border-radius: 14px;
          }
          .testimonial-track {
            gap: 20px;
            animation-duration: 35s;
          }
        }

        /* ===== Small mobile (≤480px) — 1 card ===== */
        @media (max-width: 480px) {
          .testimonial-card {
            width: clamp(240px, calc(100vw - 60px), 340px);
            padding: 10px;
            border-radius: 18px;
          }
          .testimonial-image-wrapper {
            border-radius: 12px;
          }
          .testimonial-track {
            gap: 16px;
            animation-duration: 30s;
          }
        }
      `}</style>

      <section className="py-12 md:py-20 bg-gradient-to-b from-background to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-14">
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full" />

            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Voices of Our Customers
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by families who chose a better lifestyle.
            </p>
          </div>

          {/* Slider */}
          <div className="testimonial-slider">
            <div className="testimonial-track">
              {[...testimonials, ...testimonials].map((item, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-image-wrapper">
                    <img
                      src={item.image}
                      alt="Customer testimonial"
                      className="testimonial-image"
                      loading="lazy"
                    />
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