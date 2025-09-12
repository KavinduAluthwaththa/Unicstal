import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Heart, ShoppingCart, Menu, Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center gap-2 relative z-10">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mr-3 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">IRIDESCENT</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8 relative z-10">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80 w-5 h-5" />
          <Input
            placeholder="Search for magical crystals..."
            className="pl-10 pr-4 py-3 w-full rounded-full border-2 border-white/40 bg-transparent text-white placeholder:text-white focus:border-cyan-400 focus:ring-cyan-400/50"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Wishlist */}
        <Button variant="ghost" size="sm" className="hidden md:flex text-white/80 hover:text-cyan-600 hover:bg-purple-100/50 rounded-full p-2">
          <Heart className="w-5 h-5" />
        </Button>

        {/* Shopping Cart */}
        <Button variant="ghost" size="sm" className="hidden md:flex text-white/80 hover:text-cyan-600 hover:bg-purple-100/50 rounded-full p-2">
          <ShoppingCart className="w-5 h-5" />
        </Button>

        {/* Login/Signup */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="border-purple-400/50 text-purple-700 hover:bg-purple-100/50 backdrop-blur-sm px-6 py-2 rounded-full font-medium">
            Login
          </Button>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Register
          </Button>
        </div>

        {/* Mobile Menu */}
        <Button variant="ghost" size="sm" className="md:hidden text-purple-700 hover:text-cyan-600 hover:bg-purple-100/50 rounded-full p-2">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
