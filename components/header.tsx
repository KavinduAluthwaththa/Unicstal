import { Button } from "@/components/ui/button"
import { Search, Heart, ShoppingCart, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-purple-600 rounded transform rotate-45"></div>
          <div className="w-6 h-6 bg-purple-600 rounded transform rotate-45 -ml-2"></div>
        </div>
        <span className="text-gray-900 text-xl font-bold ml-2">UNICSTAL</span>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm text-sm"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Heart className="text-gray-600 w-6 h-6 cursor-pointer hover:text-purple-600 transition-colors" />
        <ShoppingCart className="text-gray-600 w-6 h-6 cursor-pointer hover:text-purple-600 transition-colors" />
        <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full">
          Login
        </Button>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full">
          Sign Up
        </Button>
        <Menu className="text-gray-600 w-6 h-6 cursor-pointer hover:text-purple-600 transition-colors md:hidden" />
      </div>
    </header>
  )
}
