import { Instagram, Facebook, Youtube } from "lucide-react"
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
    <footer className="bg-purple-900 pt-16 pb-8 relative text-white">
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
            className="fill-white "
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Navigation Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">NAVIGATION</h3>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shop All
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Crystals and their Meanings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  REVIEWS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Designer Trade Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  CRYSTAL QUIZ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  REWARDS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  BECOME AN AFFILIATE
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  CONTACT
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Return & Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>

          {/* Crystals.com Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">CRYSTALS.COM</h3>
            <p className="text-sm text-purple-200 leading-relaxed">
              Discover our crystal shop online for home décor, wellness, and meaningful gifts.
            </p>
          </div>

          {/* Journal Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">JOURNAL</h3>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Best Crystals for Home Protection...
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  The September Birthstone: Sapphire
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  1010 Angel Number Meaning -...
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Stay in the Loop</h3>
            <p className="text-sm text-purple-200 mb-4">Join our list for new drops, stories, and rare finds.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-1 text-sm bg-white/10 border-white/20 text-white placeholder:text-purple-300" />
              <Button variant="ghost" size="sm" className="px-3 text-white hover:bg-white/10">
                →
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-purple-700">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              <TikTokIcon />
            </a>
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              <PinterestIcon />
            </a>
            <a href="#" className="text-purple-300 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
          </div>
          <p className="text-xs text-purple-400">© 2025, CRYSTALS.COM. Powered by Shopify.</p>
        </div>
      </div>

      {/* Unlock 20% Off Badge */}
      <div className="fixed bottom-4 left-4 bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border hover:shadow-xl transition-shadow cursor-pointer">
        <div className="text-center">
          <div className="text-xs font-semibold text-black">Unlock</div>
          <div className="text-sm font-bold text-black">20% Off</div>
        </div>
      </div>
    </footer>
  )
}
