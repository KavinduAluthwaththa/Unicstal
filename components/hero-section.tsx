import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-between px-6 lg:px-12 py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-white/15"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/10"></div>
      </div>

      {/* Left Content */}
      <div className="max-w-xl z-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Manifest Your Dreams with the Power of{" "}
          <span className="text-purple-200">Crystals</span>
        </h1>
        <p className="text-purple-100 text-lg mb-8 leading-relaxed">
          Align your energy, raise your vibration, and attract abundance — One Crystal at a time.
        </p>
        <Button 
          size="lg" 
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ChevronDown className="w-5 h-5 mr-2" />
          Crystals That Help You Attract
        </Button>
      </div>

      {/* Center Model */}
      <div className="hidden lg:block relative z-10">
        <div className="relative">
          <img
            src="/images/Queen 01.jpg"
            alt="Woman with crystal crown"
            className="w-96 h-[600px] object-cover object-center"
          />
        </div>
      </div>

      {/* Right Product Showcase */}
      <div className="hidden xl:block z-10 w-[30%]">
        <Card className="bg-white backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 tracking-wider">OUR CRYSTAL COLLECTION</h3>
            <Button variant="ghost" size="sm" className="p-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>

          {/* Abundance */}
          <div className="flex items-center mb-4 p-4 bg-gray-100 rounded-xl relative overflow-hidden">
            <div className="w-20 h-16 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
              <img
                src="/group-meditation-retreat--people-sitting-in-circle.jpg"
                alt="Abundance crystals"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 pr-8">
              <h4 className="font-bold text-gray-800 flex items-center mb-1">
                ✨ Abundance
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Manifest prosperity, success, and good fortune. These high-vibe stones help align your energy with wealth and opportunity.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-yellow-400 flex items-center justify-center">
              <span className="text-black text-xs font-bold transform -rotate-90 whitespace-nowrap">Shop Now</span>
            </div>
          </div>

          {/* Protection */}
          <div className="flex items-center mb-4 p-4 bg-gray-100 rounded-xl relative overflow-hidden">
            <div className="w-20 h-16 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
              <img
                src="/hands-performing-energy-healing--soft-golden-light.jpg"
                alt="Protection crystals"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 pr-8">
              <h4 className="font-bold text-gray-800 flex items-center mb-1">
                🛡️ Protection
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Shield your energy from negativity and unwanted influences. These crystals help create a strong, grounded aura of protection.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-yellow-400 flex items-center justify-center">
              <span className="text-black text-xs font-bold transform -rotate-90 whitespace-nowrap">Shop Now</span>
            </div>
          </div>

          {/* Love */}
          <div className="flex items-center mb-6 p-4 bg-gray-100 rounded-xl relative overflow-hidden">
            <div className="w-20 h-16 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
              <img
                src="/woman-in-peaceful-counseling-session--warm-lightin.jpg"
                alt="Love crystals"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 pr-8">
              <h4 className="font-bold text-gray-800 flex items-center mb-1">
                ❤️ Love
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Attract love, deepen self-love, and heal heartaches with gentle, heart-centered crystals like Rose Quartz and Rhodonite.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-yellow-400 flex items-center justify-center">
              <span className="text-black text-xs font-bold transform -rotate-90 whitespace-nowrap">Shop Now</span>
            </div>
          </div>

          {/* Shopping cart icon at bottom */}
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-6 h-6 text-black" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
