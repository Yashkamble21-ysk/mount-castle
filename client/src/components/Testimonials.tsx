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
            black 5%,
            black 95%,
            transparent
          );

          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }

        .testimonial-track {
          display: flex;
          gap: 28px;
          width: max-content;
          animation: testimonialScroll 45s linear infinite;
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

        /* Desktop */
        .testimonial-card {
          width: 380px;
          height: 520px;
          flex-shrink: 0;

          background: #fff;
          border-radius: 24px;
          padding: 18px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(0,0,0,.08);

          box-shadow: 0 10px 30px rgba(0,0,0,.08);

          transition: .35s ease;
          cursor: pointer;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(234,179,8,.25);
        }

        .testimonial-image-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 18px;
          background: #f5f5f5;
        }

        .testimonial-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: top center;
          transition: transform .4s ease;
        }

        .testimonial-card:hover .testimonial-image {
          transform: scale(1.03);
        }

        /* Large Desktop */
        @media (min-width: 1536px) {
          .testimonial-card {
            width: 420px;
            height: 570px;
          }

          .testimonial-track {
            gap: 36px;
          }
        }

        /* Tablet */
        @media (max-width:1024px) {

          .testimonial-card{
            width:340px;
            height:470px;
          }

          .testimonial-track{
            gap:22px;
            animation-duration:40s;
          }
        }

        /* Mobile */
        @media (max-width:768px){

          .testimonial-card{
            width:280px;
            height:390px;
            padding:12px;
          }

          .testimonial-track{
            gap:18px;
            animation-duration:35s;
          }
        }

        /* Small Mobile */
        @media (max-width:480px){

          .testimonial-card{
            width:240px;
            height:340px;
            padding:10px;
          }

          .testimonial-track{
            gap:16px;
          }
        }
      `}</style>

      <section className="py-12 md:py-20 bg-gradient-to-b from-background to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">

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

          <div className="testimonial-slider">
            <div className="testimonial-track">
              {[...testimonials, ...testimonials].map((item, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="testimonial-image-wrapper">
                    <img
                      src={item.image}
                      alt="Customer Testimonial"
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