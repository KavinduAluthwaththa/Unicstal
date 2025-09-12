import { Button } from "@/components/ui/button"
import { Sparkles, Star, Crown } from "lucide-react"

export function StoreBuilderSection() {
  const steps = ["Channel your mystical energy", "Manifest your vision", "Await the cosmic launch"]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Iridescent background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-yellow-500 opacity-10 blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 opacity-8 blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch relative">
          {/* Image on the left */}
          <div className="lg:flex-1">
            <div className="relative h-[500px] lg:h-[600px]">
              <img
                src="/mystical-woman-with-purple-hair-and-crown.jpg"
                alt="Mystical woman with purple hair and decorative crown"
                className="w-full h-full object-cover rounded-3xl lg:rounded-r-none shadow-2xl opacity-90"
              />
              {/* Mystical overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-3xl lg:rounded-r-none"></div>
              {/* Floating sparkles */}
              <div className="absolute top-4 right-4">
                <Sparkles className="h-8 w-8 text-cyan-300 opacity-80 animate-pulse" />
              </div>
              <div className="absolute bottom-6 left-6">
                <Star className="h-6 w-6 text-pink-300 opacity-60 animate-pulse delay-700" />
              </div>
            </div>
          </div>

          {/* Content Card on the right - no gap */}
          <div className="lg:flex-1 mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl lg:rounded-l-none p-10 lg:p-12 shadow-2xl h-[500px] lg:h-[600px] flex flex-col justify-center border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="h-8 w-8 text-cyan-400" />
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Prepare for the <br />
                  <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    Mystical Launch
                  </span>
                </h2>
              </div>

              <div className="space-y-8 mb-12">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-xl text-purple-100 font-medium">{step}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 border-none">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
