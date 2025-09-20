import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestSection from '@/components/ManifestSection';
import CrystalSection from '@/components/CrystalSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import Global3DModel from '@/components/Global3DModel';

export default function Home() {
  return (
    <>
      <Global3DModel />
      <main className="min-h-screen relative">
        <Navbar />
        <HeroSection />
        <ManifestSection />
        <CrystalSection />
        <BlogSection />
        <Footer />
      </main>
    </>
  );
}
