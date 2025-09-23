import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestSection from '@/components/ManifestSection';
import CrystalSection from '@/components/CrystalSection';
import ArticleSection from '@/components/ArticleSection';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';
import Global3DModel from '@/components/Global3DModel';
import GlobalCustomBackground from '@/components/GlobalCustomBackground';

export default function Home() {
  return (
    <>
      <GlobalCustomBackground />
      <Global3DModel />
      <main className="min-h-screen relative">
        <Navbar />
        <HeroSection />
        <ManifestSection />
        <CrystalSection />
        <ArticleSection />
        <BlogSection />
        <Footer />
      </main>
    </>
  );
}
