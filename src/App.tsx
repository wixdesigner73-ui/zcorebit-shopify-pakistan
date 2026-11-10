import Header from './components/Header';
import Hero from './components/Hero';
import LogoStrip from './components/LogoStrip';
import DesignGallery from './components/DesignGallery';
import { FAQ, Features, FinalCTA, PortfolioGallery, PricingPackages, Process, Testimonials, VideoFeature } from './components/Sections';

export default function App() {
  return (
    <>
      <a href="#pakistan-designs" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Skip to designs</a>
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <DesignGallery />
        <PricingPackages />
        <Testimonials />
        <VideoFeature />
        <PortfolioGallery />
        <Features />
        <Process />
        <FAQ />
      </main>
      <FinalCTA />
    </>
  );
}
