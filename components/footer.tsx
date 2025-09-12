import { Instagram, Facebook, Youtube, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-16 pb-8 relative text-white overflow-hidden">
      {/* Iridescent background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-yellow-500 opacity-10 blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 opacity-8 blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Newsletter Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Join the Iridescent Waitlist
              </h3>
            </div>
            <p className="text-purple-100 mb-4 leading-relaxed">
              Be the first to experience our mystical collection when we launch. 
              Get exclusive early access and special manifesting guides.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your magical email..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-purple-200 backdrop-blur-sm"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-6 py-2 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                Join
              </Button>
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <h3 className="font-semibold text-purple-100 mb-4">COMING SOON</h3>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <span className="text-cyan-300">✨ Mystical Collection</span>
              </li>
              <li>
                <span className="text-cyan-300">🔮 Energy Healing Tools</span>
              </li>
              <li>
                <span className="text-cyan-300">💎 Sacred Geometry</span>
              </li>
              <li>
                <span className="text-cyan-300">🌙 Lunar Manifestation</span>
              </li>
              <li>
                <span className="text-cyan-300">⭐ Cosmic Jewelry</span>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-purple-100 mb-4">CONNECT</h3>
            <p className="text-sm text-purple-200 mb-4 leading-relaxed">
              Follow our journey as we prepare to launch something truly magical.
            </p>
            <div className="flex gap-3">
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-purple-200 text-sm">
            © 2024 Iridescent. All rights reserved. ✨ Made with cosmic energy.
          </p>
        </div>
      </div>

      {/* Floating Waitlist Badge */}
      <div className="fixed bottom-4 left-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-2 border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm">
        <div className="text-center">
          <Sparkles className="h-6 w-6 text-white mx-auto mb-1" />
          <div className="text-xs font-bold text-white">Waitlist</div>
        </div>
      </div>
    </footer>
  )
}
