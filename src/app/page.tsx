import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestSection from '@/components/ManifestSection';
import CrystalSection from '@/components/CrystalSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import Global3DModel from '@/components/Global3DModel';
import GlobalCustomBackground from '@/components/GlobalCustomBackground';

export default function Home() {
  return (
    <div className="home-page">
      <GlobalCustomBackground />
      <Global3DModel />
      
      {/* Mobile Video Background - Under other content */}
      <div className="mobile-video-background">
        <img
          src="/assets/videos/painter_of_stars.gif"
          alt="Background animation"
          className="mobile-background-video"
        />
      </div>
      
      <main className="min-h-screen relative">
        <Navbar />
        <HeroSection />
        <ManifestSection />
        <CrystalSection />
        <BlogSection />
        <Footer />
      </main>
    </div>
  );
}
