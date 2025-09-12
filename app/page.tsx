import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductShowcase } from "@/components/product-showcase"
import { StoreBuilderSection } from "@/components/store-builder-section"
import { ManifestationSection } from "@/components/manifestation-section"
import { CrystalBlogSection } from "@/components/crystal-blog-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      
      {/* White section */}
      <div className="bg-white">
        <ProductShowcase />
      </div>
      
      {/* Purple section */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-200">
        <StoreBuilderSection />
      </div>
      
      {/* White section */}
      <div className="bg-white">
        <ManifestationSection />
      </div>
      
      {/* white section */}
      <div className="bg-white">
        <CrystalBlogSection />
      </div>
      
      <Footer />
    </main>
  )
}
