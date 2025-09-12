import { Instagram, Facebook, Youtube, Sparkles, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Custom TikTok and Pinterest icons as SVG components
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c6.627 0 12-5.372 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.87-1.835l.437-1.664c.229.436.895.804 1.604.804 2.111 0 3.633-1.941 3.633-4.354 0-2.312-1.888-4.042-4.316-4.042-3.021 0-4.625 2.003-4.625 4.137 0 .695.366 1.556.949 1.833.095.045.145.025.168-.069.017-.07.111-.448.154-.623.058-.239.035-.322-.123-.531-.344-.456-.564-1.04-.564-1.87 0-2.413 1.767-4.583 4.8-4.583 2.62 0 4.558 1.792 4.558 4.184 0 3.146-1.393 5.804-3.463 5.804-.678 0-1.185-.578-.1.022-1.185-.578-1.022-1.816-1.022-1.816s-.239.954-.297 1.19c-.108.442-.399 1.008-.594 1.346z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NAVIGATION
            </h3>
            <div className="space-y-3">
              <Link href="/shop" className="block text-purple-200 hover:text-cyan-300 transition-colors">Shop</Link>
              <Link href="/collections" className="block text-purple-200 hover:text-cyan-300 transition-colors">Collections</Link>
              <Link href="/about" className="block text-purple-200 hover:text-cyan-300 transition-colors">About</Link>
              <Link href="/contact" className="block text-purple-200 hover:text-cyan-300 transition-colors">Contact</Link>
              <Link href="/shipping" className="block text-purple-200 hover:text-cyan-300 transition-colors">Shipping</Link>
              <Link href="/returns" className="block text-purple-200 hover:text-cyan-300 transition-colors">Returns & Exchanges</Link>
              <Link href="/faq" className="block text-purple-200 hover:text-cyan-300 transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Crystals.com Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CRYSTALS.COM
            </h3>
            <p className="text-purple-200 text-sm leading-relaxed">
              A global marketplace for extraordinary crystals, stones, and spiritual tools. We curate the finest quality specimens from trusted sources worldwide, bringing you authentic pieces that enhance your spiritual journey and energetic practice.
            </p>
            <div className="pt-2">
              <p className="text-cyan-300 text-sm font-semibold">✨ Authentic • Ethically Sourced • Energy Activated</p>
            </div>
          </div>

          {/* Journal Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              JOURNAL
            </h3>
            <div className="space-y-3">
              <div className="border-l-2 border-cyan-400/50 pl-3">
                <Link href="/journal/crystal-care" className="block text-purple-200 hover:text-cyan-300 transition-colors text-sm">
                  How to Care for Your Crystals
                </Link>
                <p className="text-purple-300 text-xs mt-1">Dec 15, 2024</p>
              </div>
              <div className="border-l-2 border-purple-400/50 pl-3">
                <Link href="/journal/manifestation-guide" className="block text-purple-200 hover:text-cyan-300 transition-colors text-sm">
                  Manifestation with Rose Quartz
                </Link>
                <p className="text-purple-300 text-xs mt-1">Dec 12, 2024</p>
              </div>
              <div className="border-l-2 border-pink-400/50 pl-3">
                <Link href="/journal/moon-rituals" className="block text-purple-200 hover:text-cyan-300 transition-colors text-sm">
                  New Moon Rituals for Beginners
                </Link>
                <p className="text-purple-300 text-xs mt-1">Dec 8, 2024</p>
              </div>
              <Link href="/journal" className="inline-flex items-center text-cyan-300 hover:text-cyan-200 text-sm font-semibold mt-2">
                View All Articles <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Stay in the Loop
            </h3>
            <p className="text-sm text-purple-200 mb-4">Join our list for new drops, stories, and rare finds.</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 text-sm bg-white/10 border-white/20 text-white placeholder:text-purple-200 rounded-lg"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="px-3 text-white hover:bg-white/10 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-lg"
              >
                →
              </Button>
            </div>
            
            {/* Social Media */}
            <div className="pt-4">
              <p className="text-sm text-purple-200 mb-3">Follow the magic</p>
              <div className="flex gap-2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-purple-200 hover:bg-cyan-400/20 hover:text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-purple-200 hover:bg-cyan-400/20 hover:text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <TikTokIcon />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-purple-200 hover:bg-cyan-400/20 hover:text-cyan-300 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <PinterestIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-purple-200 text-sm">
            © 2024 Iridescent. All rights reserved. ✨ Made with cosmic energy.
          </p>
        </div>
      </div>

      {/* Shopping CTA Badge */}
      <div className="fixed bottom-4 left-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-2 border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm">
        <div className="text-center">
          <ShoppingCart className="h-6 w-6 text-white mx-auto mb-1" />
          <div className="text-xs font-bold text-white">Shop</div>
        </div>
      </div>
    </footer>
  )
}
