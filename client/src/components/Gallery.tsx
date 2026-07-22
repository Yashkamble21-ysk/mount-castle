import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Gallery Section Component
 * Features: Image grid with hover zoom, lightbox modal, navigation
 * Design: Responsive grid with smooth animations
 */
export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { src: '/images/nature living.jpeg', alt: 'Exterior View' },
    { src: '/images/Screenshot_1.jpeg', alt: 'Interior Design' },
    { src: '/images/Screenshot_2.jpeg', alt: 'Amenities' },
    { src: '/images/DSC_1.jpeg', alt: 'Location' },
    { src: '/images/IMG_1.jpeg', alt: 'Evening View' },
    { src: '/images/New road to the forest hill.png', alt: 'Living Space' },
  ];

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <div className="h-1 w-16 bg-accent mb-6" />
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore the stunning architecture, luxurious interiors, and world-class amenities of Mount Castle through our curated gallery.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden shadow-lg h-64 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <ChevronRight className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-screen flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-accent hover:bg-accent/90 text-accent-foreground p-2 rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrevious}
                className="bg-accent hover:bg-accent/90 text-accent-foreground p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <p className="text-white text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </p>

              <button
                onClick={handleNext}
                className="bg-accent hover:bg-accent/90 text-accent-foreground p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
