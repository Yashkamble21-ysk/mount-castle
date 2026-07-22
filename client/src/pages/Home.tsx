import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Location from '@/components/Location';
import ProjectDetails from '@/components/ProjectDetails';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
//import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Mount Castle Premium Real Estate Landing Page
 * A luxury residential project landing page with all sections
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Location />
        <ProjectDetails />
        <Amenities />
        <Gallery />
        <Testimonials />
        {/* <FAQ /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
