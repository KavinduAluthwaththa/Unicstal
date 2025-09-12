import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"
import { StoreBuilderSection } from "@/components/store-builder-section"
import { ManifestationSection } from "@/components/manifestation-section"
import { CrystalBlogSection } from "@/components/crystal-blog-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div className="h-1 bg-primary"></div>
      <ProductShowcase />
      <StoreBuilderSection />
      <ManifestationSection />
      <CrystalBlogSection />
      <Footer />
    </main>
  )
}
