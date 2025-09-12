import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Heart, ShoppingCart, Menu, Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl border-b border-purple-300/20 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IRIDESCENT</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          <Input
            placeholder="Search for magical crystals..."
            className="pl-10 pr-4 py-3 w-full rounded-full border-purple-300/30 bg-white/10 backdrop-blur-sm text-white placeholder-purple-300 focus:border-purple-400 focus:ring-purple-400/50"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Wishlist */}
        <Button variant="ghost" size="sm" className="hidden md:flex text-purple-200 hover:text-white hover:bg-purple-500/20">
          <Heart className="w-5 h-5" />
        </Button>

        {/* Shopping Cart */}
        <Button variant="ghost" size="sm" className="hidden md:flex text-purple-200 hover:text-white hover:bg-purple-500/20">
          <ShoppingCart className="w-5 h-5" />
        </Button>

        {/* Login/Signup */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" className="border-purple-300/50 text-purple-200 hover:bg-purple-500/20 backdrop-blur-sm px-8 py-3 rounded-full text-lg font-medium">
            Login
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg">
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Menu */}
        <Button variant="ghost" size="sm" className="md:hidden text-purple-200">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
